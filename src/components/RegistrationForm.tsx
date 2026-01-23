"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signInWithPopup, signOut, User } from "firebase/auth";
import { collection, addDoc, query, where, getDocs, orderBy, Timestamp } from "firebase/firestore";
import { auth, db, googleProvider, GOOGLE_SHEETS_URL, UPI_ID, UPI_NAME } from "@/lib/firebase";
import { QRCodeSVG } from "qrcode.react";
import { X, Users, Phone, Mail, Building, CreditCard, CheckCircle, Clock, AlertCircle } from "lucide-react";

interface RegistrationFormProps {
    eventId: string;
    eventName: string;
    category: "it" | "management" | "cultural" | "sports";
    teamSize: string;
    registrationFee: string;
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

interface Member {
    name: string;
    phone: string;
}

type RegistrationStep = "auth" | "form" | "payment" | "transaction" | "success";

export default function RegistrationForm({
    eventId,
    eventName,
    category,
    teamSize,
    registrationFee,
    isOpen,
    onClose,
    onSuccess
}: RegistrationFormProps) {
    const [step, setStep] = useState<RegistrationStep>("auth");
    const [user, setUser] = useState<User | null>(null);
    const [collegeName, setCollegeName] = useState("");
    const [members, setMembers] = useState<Member[]>([{ name: "", phone: "" }]);
    const [transactionId, setTransactionId] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [teamNumber, setTeamNumber] = useState<number | null>(null);
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

    // Parse team size to determine number of members
    const getRequiredMembers = (): number => {
        if (teamSize.includes("8 + 2") || teamSize.includes("8+2")) return 10;
        if (teamSize.includes("4")) return 4;
        if (teamSize.includes("2")) return 2;
        if (teamSize.includes("Solo") || teamSize.includes("1") || teamSize.includes("Individual")) return 1;
        return 2; // Default
    };

    const requiredMembers = getRequiredMembers();

    // Parse fee amount
    const getFeeAmount = (): string => {
        const match = registrationFee.match(/₹?(\d+)/);
        return match ? match[1] : "0";
    };

    const feeAmount = getFeeAmount();

    // Initialize members array based on team size
    useEffect(() => {
        const initialMembers: Member[] = [];
        for (let i = 0; i < requiredMembers; i++) {
            initialMembers.push({ name: "", phone: "" });
        }
        setMembers(initialMembers);
    }, [requiredMembers]);

    // Timer countdown for payment
    useEffect(() => {
        if (step === "payment" && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [step, timeLeft]);

    // Format time for display
    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    // Google Sign In
    const handleGoogleSignIn = async () => {
        try {
            setLoading(true);
            setError("");
            const result = await signInWithPopup(auth, googleProvider);
            setUser(result.user);
            setStep("form");
        } catch (err: any) {
            setError(err.message || "Failed to sign in with Google");
        } finally {
            setLoading(false);
        }
    };

    // Update member data
    const updateMember = (index: number, field: keyof Member, value: string) => {
        const updated = [...members];
        updated[index][field] = value;
        setMembers(updated);
    };

    // Validate form
    const validateForm = (): boolean => {
        if (!collegeName.trim()) {
            setError("Please enter your college name");
            return false;
        }
        for (let i = 0; i < members.length; i++) {
            if (!members[i].name.trim()) {
                setError(`Please enter Member ${i + 1} name`);
                return false;
            }
            if (!members[i].phone.trim() || members[i].phone.length < 10) {
                setError(`Please enter a valid phone number for Member ${i + 1}`);
                return false;
            }
        }
        return true;
    };

    // Proceed to payment
    const handleProceedToPayment = () => {
        setError("");
        if (validateForm()) {
            setTimeLeft(300); // Reset timer
            setStep("payment");
        }
    };

    // Handle payment done
    const handlePaymentDone = () => {
        setStep("transaction");
    };

    // Submit registration
    const handleSubmit = async () => {
        if (!transactionId.trim()) {
            setError("Please enter the UPI Transaction ID");
            return;
        }

        try {
            setLoading(true);
            setError("");

            // Get next team number
            const registrationsRef = collection(db, "registrations", eventId, "teams");
            const snapshot = await getDocs(registrationsRef);
            const nextTeamNumber = snapshot.size + 1;

            // Prepare registration data
            const registrationData = {
                teamNumber: nextTeamNumber,
                eventId,
                eventName,
                category,
                email: user?.email || "",
                collegeName,
                members,
                registrationFee,
                transactionId,
                paymentStatus: "pending",
                registeredAt: Timestamp.now(),
                userId: user?.uid || ""
            };

            // Save to Firebase
            await addDoc(registrationsRef, registrationData);

            // Save to Google Sheets
            try {
                await fetch(GOOGLE_SHEETS_URL, {
                    method: "POST",
                    mode: "no-cors",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...registrationData,
                        registeredAt: new Date().toISOString()
                    }),
                });
            } catch (sheetError) {
                console.error("Google Sheets sync failed:", sheetError);
                // Continue even if Sheets sync fails
            }

            setTeamNumber(nextTeamNumber);
            setStep("success");
            onSuccess();

        } catch (err: any) {
            setError(err.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Close and reset
    const handleClose = () => {
        setStep("auth");
        setCollegeName("");
        setTransactionId("");
        setError("");
        setTeamNumber(null);
        if (user) {
            signOut(auth);
            setUser(null);
        }
        onClose();
    };

    // UPI Payment URL
    const upiUrl = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(UPI_NAME)}&am=${feeAmount}&cu=INR&tn=${encodeURIComponent(`SHRESHTA 2026 - ${eventName}`)}`;

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                onClick={handleClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#141418] border border-white/10 rounded-2xl shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-[#141418] border-b border-white/10">
                        <div>
                            <h2 className="text-xl font-bold text-white">Register for Event</h2>
                            <p className="text-sm text-zinc-400">{eventName}</p>
                        </div>
                        <button
                            onClick={handleClose}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5 text-zinc-400" />
                        </button>
                    </div>

                    <div className="p-6">
                        {/* Error Message */}
                        {error && (
                            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-400 text-sm">
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                {error}
                            </div>
                        )}

                        {/* Step 1: Google Auth */}
                        {step === "auth" && (
                            <div className="text-center py-8">
                                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#d4a843]/10 flex items-center justify-center">
                                    <Mail className="w-10 h-10 text-[#d4a843]" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">Sign in to Register</h3>
                                <p className="text-zinc-400 text-sm mb-8">
                                    Sign in with your Google account to continue registration
                                </p>
                                <button
                                    onClick={handleGoogleSignIn}
                                    disabled={loading}
                                    className="w-full py-3 px-4 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                            </svg>
                                            Continue with Google
                                        </>
                                    )}
                                </button>
                            </div>
                        )}

                        {/* Step 2: Registration Form */}
                        {step === "form" && (
                            <div className="space-y-5">
                                {/* User Email (Read-only) */}
                                <div>
                                    <label className="block text-sm font-medium text-zinc-400 mb-2">
                                        <Mail className="w-4 h-4 inline mr-2" />
                                        Email (from Google)
                                    </label>
                                    <input
                                        type="email"
                                        value={user?.email || ""}
                                        readOnly
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none"
                                    />
                                </div>

                                {/* College Name */}
                                <div>
                                    <label className="block text-sm font-medium text-zinc-400 mb-2">
                                        <Building className="w-4 h-4 inline mr-2" />
                                        College Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={collegeName}
                                        onChange={(e) => setCollegeName(e.target.value)}
                                        placeholder="Enter your college name"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4a843]/50"
                                    />
                                </div>

                                {/* Team Members */}
                                <div className="space-y-4">
                                    <h4 className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                                        <Users className="w-4 h-4" />
                                        Team Members ({requiredMembers} required)
                                    </h4>
                                    {members.map((member, index) => (
                                        <div key={index} className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-3">
                                            <h5 className="text-sm font-semibold text-[#d4a843]">Member {index + 1}</h5>
                                            <input
                                                type="text"
                                                value={member.name}
                                                onChange={(e) => updateMember(index, "name", e.target.value)}
                                                placeholder="Full Name"
                                                className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4a843]/50"
                                            />
                                            <input
                                                type="tel"
                                                value={member.phone}
                                                onChange={(e) => updateMember(index, "phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                                                placeholder="Phone Number"
                                                className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4a843]/50"
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* Entry Fee Display */}
                                <div className="p-4 bg-[#d4a843]/10 border border-[#d4a843]/30 rounded-xl">
                                    <div className="flex items-center justify-between">
                                        <span className="text-zinc-400 flex items-center gap-2">
                                            <CreditCard className="w-4 h-4" />
                                            Entry Fee
                                        </span>
                                        <span className="text-xl font-bold text-[#d4a843]">{registrationFee}</span>
                                    </div>
                                </div>

                                {/* Continue Button */}
                                <button
                                    onClick={handleProceedToPayment}
                                    className="w-full py-3 bg-[#d4a843] text-black font-semibold rounded-xl hover:bg-[#e5b854] transition-colors"
                                >
                                    Continue to Payment →
                                </button>
                            </div>
                        )}

                        {/* Step 3: Payment QR Code */}
                        {step === "payment" && (
                            <div className="text-center py-4">
                                <h3 className="text-lg font-semibold text-white mb-2">Scan QR Code to Pay</h3>
                                <p className="text-zinc-400 text-sm mb-6">
                                    Amount: <span className="text-[#d4a843] font-bold text-lg">₹{feeAmount}</span>
                                </p>

                                {/* QR Code */}
                                <div className="inline-block p-4 bg-white rounded-2xl mb-6">
                                    <QRCodeSVG
                                        value={upiUrl}
                                        size={200}
                                        level="H"
                                        includeMargin={true}
                                    />
                                </div>

                                {/* UPI ID */}
                                <p className="text-zinc-400 text-sm mb-4">
                                    UPI ID: <span className="text-white font-mono">{UPI_ID}</span>
                                </p>

                                {/* Timer */}
                                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${timeLeft < 60 ? 'bg-red-500/20 text-red-400' : 'bg-white/10 text-zinc-300'}`}>
                                    <Clock className="w-4 h-4" />
                                    <span className="font-mono font-semibold">{formatTime(timeLeft)}</span>
                                    <span className="text-sm">remaining</span>
                                </div>

                                {timeLeft === 0 ? (
                                    <div className="text-red-400 mb-4">
                                        <p>Payment time expired. Please try again.</p>
                                        <button
                                            onClick={() => setTimeLeft(300)}
                                            className="mt-2 text-[#d4a843] underline"
                                        >
                                            Restart Timer
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={handlePaymentDone}
                                        className="w-full py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-500 transition-colors"
                                    >
                                        I have completed the payment ✓
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Step 4: Transaction ID */}
                        {step === "transaction" && (
                            <div className="py-4">
                                <div className="text-center mb-6">
                                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                        <CheckCircle className="w-8 h-8 text-emerald-500" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-white">Payment Confirmation</h3>
                                    <p className="text-zinc-400 text-sm">Enter your UPI Transaction ID to complete registration</p>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-400 mb-2">
                                            UPI Transaction ID / Reference Number *
                                        </label>
                                        <input
                                            type="text"
                                            value={transactionId}
                                            onChange={(e) => setTransactionId(e.target.value)}
                                            placeholder="e.g., 123456789012"
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4a843]/50 font-mono"
                                        />
                                        <p className="text-xs text-zinc-500 mt-2">
                                            You can find this in your UPI app&apos;s transaction history
                                        </p>
                                    </div>

                                    <button
                                        onClick={handleSubmit}
                                        disabled={loading}
                                        className="w-full py-3 bg-[#d4a843] text-black font-semibold rounded-xl hover:bg-[#e5b854] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {loading ? (
                                            <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                        ) : (
                                            "Submit Registration"
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 5: Success */}
                        {step === "success" && (
                            <div className="text-center py-8">
                                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                    <CheckCircle className="w-12 h-12 text-emerald-500" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Registration Successful!</h3>
                                <p className="text-zinc-400 mb-4">
                                    You are registered as <span className="text-[#d4a843] font-bold">Team #{teamNumber}</span>
                                </p>
                                <p className="text-sm text-zinc-500 mb-6">
                                    for {eventName}
                                </p>
                                <button
                                    onClick={handleClose}
                                    className="w-full py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
