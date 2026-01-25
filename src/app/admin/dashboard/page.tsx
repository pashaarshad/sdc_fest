"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { collection, doc, updateDoc, getDocs, deleteDoc, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { allEvents } from "@/data/events";

interface Member {
    name: string;
    phone: string;
}

interface Registration {
    id: string;
    teamNumber: number;
    eventId: string;
    eventName: string;
    category: string;
    collegeName: string;
    email: string;
    members: Member[];
    registrationFee: string;
    utrNumber: string;
    paymentStatus: string;
    registeredAt: any;
}

const EDIT_PIN = "6565";

export default function AdminDashboard() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<string>("all");
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ total: 0, pending: 0, verified: 0 });
    const router = useRouter();

    // Edit mode states
    const [editMode, setEditMode] = useState(false);
    const [showPinModal, setShowPinModal] = useState(false);
    const [pinInput, setPinInput] = useState("");
    const [pinError, setPinError] = useState("");
    const [editingRow, setEditingRow] = useState<string | null>(null);
    const [editData, setEditData] = useState<Registration | null>(null);

    // Details Modal State
    const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);

    // Check authentication
    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem("adminLoggedIn");
        if (isLoggedIn !== "true") {
            router.push("/admin");
        } else {
            setIsAuthenticated(true);
        }
    }, [router]);

    // Fetch registrations
    useEffect(() => {
        if (!isAuthenticated) return;

        const fetchAllRegistrations = async () => {
            setLoading(true);
            const allRegs: Registration[] = [];

            for (const event of allEvents) {
                try {
                    const teamsRef = collection(db, "registrations", event.id, "teams");
                    const snapshot = await getDocs(teamsRef);
                    snapshot.forEach((docSnap) => {
                        allRegs.push({
                            id: docSnap.id,
                            eventId: event.id,
                            ...docSnap.data()
                        } as Registration);
                    });
                } catch (error) {
                    console.error(`Error fetching ${event.id}:`, error);
                }
            }

            allRegs.sort((a, b) => {
                const timeA = a.registeredAt?.seconds || 0;
                const timeB = b.registeredAt?.seconds || 0;
                return timeB - timeA;
            });

            setRegistrations(allRegs);
            setStats({
                total: allRegs.length,
                pending: allRegs.filter(r => r.paymentStatus !== "completed").length,
                verified: allRegs.filter(r => r.paymentStatus === "completed").length
            });
            setLoading(false);
        };

        fetchAllRegistrations();
    }, [isAuthenticated]);

    const filteredRegistrations = selectedEvent === "all"
        ? registrations
        : registrations.filter(r => r.eventId === selectedEvent);

    // Handle PIN verification
    const handlePinSubmit = () => {
        if (pinInput === EDIT_PIN) {
            setEditMode(true);
            setShowPinModal(false);
            setPinInput("");
            setPinError("");
        } else {
            setPinError("Incorrect PIN");
        }
    };

    // Start editing a row (inline or module)
    const startEditing = (reg: Registration) => {
        setEditingRow(reg.id);
        setEditData({ ...reg, members: [...reg.members.map(m => ({ ...m }))] });
    };

    // Cancel editing
    const cancelEditing = () => {
        setEditingRow(null);
        setEditData(null);
    };

    // Save edits
    const saveEdits = async () => {
        if (!editData) return;

        try {
            const docRef = doc(db, "registrations", editData.eventId, "teams", editData.id);

            // If event changed, we need to move the document
            const originalReg = registrations.find(r => r.id === editData.id);

            if (originalReg && originalReg.eventId !== editData.eventId) {
                // Delete from old collection
                await deleteDoc(doc(db, "registrations", originalReg.eventId, "teams", originalReg.id));

                // Get new team number for new event
                const newEventTeams = collection(db, "registrations", editData.eventId, "teams");
                const snapshot = await getDocs(newEventTeams);
                const newTeamNumber = snapshot.size + 1;

                // Add to new collection with new ID
                const { id, ...dataWithoutId } = editData;
                await addDoc(collection(db, "registrations", editData.eventId, "teams"), {
                    ...dataWithoutId,
                    teamNumber: newTeamNumber
                });
            } else {
                // Update in place
                await updateDoc(docRef, {
                    collegeName: editData.collegeName,
                    members: editData.members,
                    registrationFee: editData.registrationFee,
                    eventName: editData.eventName,
                    utrNumber: editData.utrNumber,
                    paymentStatus: editData.paymentStatus
                });
            }

            // Reload page to refresh data (simplest way to handle ID changes/moves)
            window.location.reload();
        } catch (error) {
            console.error("Error saving edits:", error);
            alert("Failed to save changes. Please try again.");
        }
    };

    // Update edit status directly (for modal or inline)
    const updatePaymentStatus = async (eventId: string, docId: string, status: string) => {
        try {
            const docRef = doc(db, "registrations", eventId, "teams", docId);
            await updateDoc(docRef, { paymentStatus: status });

            setRegistrations(prev => prev.map(r =>
                r.id === docId && r.eventId === eventId
                    ? { ...r, paymentStatus: status }
                    : r
            ));

            setStats(prev => ({
                ...prev,
                pending: status === "completed" ? prev.pending - 1 : prev.pending + 1,
                verified: status === "completed" ? prev.verified + 1 : prev.verified - 1
            }));

            // Also update selected registration if modal is open
            if (selectedRegistration && selectedRegistration.id === docId) {
                setSelectedRegistration(prev => prev ? { ...prev, paymentStatus: status } : null);
            }
            // Also update editData if editing
            if (editData && editData.id === docId) {
                setEditData(prev => prev ? { ...prev, paymentStatus: status } : null);
            }

        } catch (error) {
            console.error("Error updating status:", error);
            alert("Failed to update status");
        }
    };

    // Update edit data
    const updateEditField = (field: keyof Registration, value: any) => {
        if (!editData) return;
        setEditData({ ...editData, [field]: value });
    };

    const updateEditMember = (index: number, field: keyof Member, value: string) => {
        if (!editData) return;
        const newMembers = [...editData.members];
        newMembers[index] = { ...newMembers[index], [field]: value };
        setEditData({ ...editData, members: newMembers });
    };

    const handleEventChange = (newEventId: string) => {
        if (!editData) return;
        const event = allEvents.find(e => e.id === newEventId);
        if (event) {
            setEditData({
                ...editData,
                eventId: newEventId,
                eventName: event.title,
                registrationFee: event.registrationFee,
                category: event.category
            });
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem("adminLoggedIn");
        router.push("/admin");
    };

    const formatDate = (timestamp: any) => {
        if (!timestamp?.seconds) return "N/A";
        return new Date(timestamp.seconds * 1000).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    // Open Modal Handler
    const handleRowClick = (reg: Registration) => {
        if (!editMode || (editMode && editingRow !== reg.id)) {
            setSelectedRegistration(reg);
            // If in edit mode, initialize edit data for the modal too
            if (editMode) {
                setEditingRow(reg.id);
                setEditData({ ...reg, members: [...reg.members.map(m => ({ ...m }))] });
            }
        }
    };

    const closeModal = () => {
        setSelectedRegistration(null);
        if (editMode) {
            cancelEditing();
        }
    };


    if (!isAuthenticated) {
        return null;
    }

    return (
        <>
            <style jsx>{`
                .dashboard {
                    min-height: 100vh;
                    background: #0a0a0c;
                    color: #fff;
                }

                .dashboard-header {
                    background: linear-gradient(180deg, #1a1a1f 0%, #141418 100%);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                    padding: 20px 0;
                    position: sticky;
                    top: 0;
                    z-index: 100;
                }

                .header-inner {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 0 24px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .header-title {
                    font-size: 24px;
                    font-weight: 700;
                    color: #fff;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .header-title span { color: #d4a843; }

                .header-actions { display: flex; align-items: center; gap: 12px; }

                .edit-btn {
                    padding: 10px 20px;
                    background: rgba(212, 168, 67, 0.1);
                    border: 1px solid rgba(212, 168, 67, 0.3);
                    border-radius: 10px;
                    color: #d4a843;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .edit-btn:hover { background: rgba(212, 168, 67, 0.2); }
                .edit-btn.active { background: rgba(212, 168, 67, 0.3); border-color: #d4a843; }

                .logout-btn {
                    padding: 10px 20px;
                    background: rgba(239, 68, 68, 0.1);
                    border: 1px solid rgba(239, 68, 68, 0.3);
                    border-radius: 10px;
                    color: #fca5a5;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .logout-btn:hover { background: rgba(239, 68, 68, 0.2); }

                .dashboard-content {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 32px 24px;
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 20px;
                    margin-bottom: 32px;
                }

                .stat-card {
                    background: linear-gradient(180deg, #1a1a1f 0%, #141418 100%);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 16px;
                    padding: 24px;
                }

                .stat-label {
                    font-size: 13px;
                    color: #71717a;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin-bottom: 8px;
                }

                .stat-value { font-size: 36px; font-weight: 800; color: #fff; }
                .stat-card.gold .stat-value { color: #d4a843; }
                .stat-card.green .stat-value { color: #4ade80; }
                .stat-card.yellow .stat-value { color: #fbbf24; }

                .filter-section { margin-bottom: 24px; }
                .filter-label { font-size: 14px; color: #a1a1aa; margin-bottom: 12px; }

                .filter-select {
                    padding: 12px 16px;
                    background: #1a1a1f;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                    color: #fff;
                    font-size: 15px;
                    min-width: 250px;
                    cursor: pointer;
                }

                .table-container {
                    background: linear-gradient(180deg, #1a1a1f 0%, #141418 100%);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 16px;
                    overflow: hidden;
                }

                .table-header {
                    padding: 20px 24px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .table-title { font-size: 18px; font-weight: 700; color: #fff; }
                .table-count { font-size: 14px; color: #d4a843; }

                .registrations-table { width: 100%; border-collapse: collapse; }

                .registrations-table th {
                    text-align: left;
                    padding: 14px 16px;
                    font-size: 11px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    color: #d4a843;
                    background: rgba(0, 0, 0, 0.3);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                }

                .registrations-table td {
                    padding: 14px 16px;
                    font-size: 14px;
                    color: #a1a1aa;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
                    vertical-align: top;
                }

                .registrations-table tr:hover td { background: rgba(255, 255, 255, 0.02); cursor: pointer; }

                /* Responsive Table Hiding */
                @media (max-width: 768px) {
                    .hide-mobile { display: none; }
                }

                .event-tag {
                    display: inline-block;
                    padding: 4px 10px;
                    background: rgba(212, 168, 67, 0.15);
                    border: 1px solid rgba(212, 168, 67, 0.3);
                    border-radius: 6px;
                    font-size: 11px;
                    font-weight: 600;
                    color: #d4a843;
                    white-space: nowrap;
                }

                .team-badge {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 32px;
                    height: 32px;
                    background: linear-gradient(135deg, rgba(212, 168, 67, 0.2) 0%, rgba(212, 168, 67, 0.1) 100%);
                    border: 1px solid rgba(212, 168, 67, 0.3);
                    border-radius: 8px;
                    font-size: 13px;
                    font-weight: 700;
                    color: #d4a843;
                }

                .college-name { color: #e4e4e7; font-weight: 500; }
                .email-text { font-size: 12px; color: #71717a; }
                .member-item { font-size: 12px; padding: 2px 0; }
                .member-name { color: #e4e4e7; }
                .member-phone { color: #71717a; margin-left: 8px; }

                .utr-number {
                    font-family: monospace;
                    font-size: 12px;
                    color: #a1a1aa;
                    background: rgba(255, 255, 255, 0.05);
                    padding: 4px 8px;
                    border-radius: 4px;
                }

                .status-select {
                    padding: 8px 12px;
                    border-radius: 8px;
                    font-size: 13px;
                    font-weight: 600;
                    cursor: pointer;
                    border: none;
                }

                .status-pending { background: rgba(234, 179, 8, 0.15); color: #fbbf24; border: 1px solid rgba(234, 179, 8, 0.3); }
                .status-completed { background: rgba(34, 197, 94, 0.15); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.3); }

                .date-text { font-size: 12px; color: #71717a; }

                .loading-container { display: flex; align-items: center; justify-content: center; padding: 80px 20px; }
                .loading-spinner {
                    width: 50px;
                    height: 50px;
                    border: 4px solid rgba(212, 168, 67, 0.2);
                    border-top-color: #d4a843;
                    border-radius: 50%;
                    animation: spin 0.8s linear infinite;
                }

                @keyframes spin { to { transform: rotate(360deg); } }

                .empty-state { text-align: center; padding: 80px 20px; color: #71717a; }
                .mobile-scroll { overflow-x: auto; }

                /* Edit Mode Styles & Modal */
                .edit-input {
                    width: 100%;
                    padding: 8px 10px;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(212, 168, 67, 0.3);
                    border-radius: 6px;
                    color: #fff;
                    font-size: 13px;
                    outline: none;
                }

                .edit-input:focus { border-color: #d4a843; }

                .edit-select {
                    width: 100%;
                    padding: 8px 10px;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(212, 168, 67, 0.3);
                    border-radius: 6px;
                    color: #fff;
                    font-size: 13px;
                    cursor: pointer;
                }

                .action-btns { display: flex; gap: 8px; }
                .save-btn { padding: 6px 12px; background: rgba(34, 197, 94, 0.2); border: 1px solid rgba(34, 197, 94, 0.4); border-radius: 6px; color: #4ade80; font-size: 12px; font-weight: 600; cursor: pointer; }
                .cancel-btn { padding: 6px 12px; background: rgba(239, 68, 68, 0.2); border: 1px solid rgba(239, 68, 68, 0.4); border-radius: 6px; color: #fca5a5; font-size: 12px; font-weight: 600; cursor: pointer; }
                .edit-row-btn { padding: 6px 12px; background: rgba(212, 168, 67, 0.2); border: 1px solid rgba(212, 168, 67, 0.4); border-radius: 6px; color: #d4a843; font-size: 12px; font-weight: 600; cursor: pointer; }

                /* Modal Overlay */
                .modal-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.8);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    padding: 20px;
                    backdrop-filter: blur(5px);
                }

                .modal-box {
                    background: #1a1a1f;
                    border: 1px solid rgba(212, 168, 67, 0.3);
                    border-radius: 16px;
                    padding: 24px;
                    max-width: 500px;
                    width: 100%;
                    max-height: 90vh;
                    overflow-y: auto;
                    position: relative;
                }

                .modal-close {
                    position: absolute;
                    top: 16px;
                    right: 16px;
                    font-size: 24px;
                    color: #71717a;
                    cursor: pointer;
                    background: none;
                    border: none;
                }

                .modal-title { font-size: 20px; font-weight: 700; color: #fff; margin-bottom: 24px; padding-right: 20px; }
                .modal-subtitle { font-size: 14px; color: #71717a; margin-bottom: 24px; }
                .pin-input { width: 100%; padding: 16px; background: rgba(255, 255, 255, 0.05); border: 2px solid rgba(255, 255, 255, 0.1); border-radius: 12px; font-size: 24px; font-family: monospace; color: #fff; text-align: center; letter-spacing: 8px; outline: none; }
                .pin-input:focus { border-color: #d4a843; }
                .pin-error { color: #fca5a5; font-size: 14px; margin-top: 12px; }
                .modal-btns { display: flex; gap: 12px; margin-top: 24px; }
                .modal-btn { flex: 1; padding: 14px; border-radius: 10px; font-size: 15px; font-weight: 600; cursor: pointer; border: none; }
                .modal-btn.primary { background: #d4a843; color: #000; }
                .modal-btn.secondary { background: rgba(255, 255, 255, 0.1); color: #fff; }
                .edit-mode-badge { display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; background: rgba(212, 168, 67, 0.2); border: 1px solid rgba(212, 168, 67, 0.4); border-radius: 6px; color: #d4a843; font-size: 12px; font-weight: 600; margin-left: 12px; }

                /* Details Rows */
                .detail-row { margin-bottom: 16px; }
                .detail-label { font-size: 12px; color: #71717a; text-transform: uppercase; margin-bottom: 6px; font-weight: 600; }
                .detail-value { font-size: 15px; color: #fff; }

                @media (max-width: 768px) {
                    .header-title { font-size: 18px; }
                    .stats-grid { grid-template-columns: 1fr 1fr; }
                    .filter-select { width: 100%; }
                    .header-actions { flex-wrap: wrap; }
                    .edit-mode-badge { display: none; } /* Hide on mobile to save space */
                }
            `}</style>

            {/* PIN Modal */}
            {showPinModal && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <button className="modal-close" onClick={() => { setShowPinModal(false); setPinInput(""); setPinError(""); }}>×</button>
                        <h3 className="modal-title">🔐 Enter Edit PIN</h3>
                        <p className="modal-subtitle">Enter 4-digit PIN to enable edit mode</p>
                        <input
                            type="password"
                            className="pin-input"
                            value={pinInput}
                            onChange={(e) => setPinInput(e.target.value.replace(/\D/g, "").slice(0, 4))}
                            placeholder="••••"
                            maxLength={4}
                            autoFocus
                        />
                        {pinError && <p className="pin-error">{pinError}</p>}
                        <div className="modal-btns">
                            <button className="modal-btn secondary" onClick={() => { setShowPinModal(false); setPinInput(""); setPinError(""); }}>
                                Cancel
                            </button>
                            <button className="modal-btn primary" onClick={handlePinSubmit}>
                                Unlock
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Details Modal */}
            {selectedRegistration && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <button className="modal-close" onClick={closeModal}>×</button>
                        <h3 className="modal-title">
                            {editMode ? "Edit Registration" : "Registration Details"}
                        </h3>

                        {editMode && editData ? (
                            <div className="edit-form-container">
                                <div className="detail-row">
                                    <div className="detail-label">Event</div>
                                    <select
                                        className="edit-select"
                                        value={editData.eventId}
                                        onChange={(e) => handleEventChange(e.target.value)}
                                    >
                                        {allEvents.map((event) => (
                                            <option key={event.id} value={event.id}>
                                                {event.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="detail-row">
                                    <div className="detail-label">College</div>
                                    <input
                                        type="text"
                                        className="edit-input"
                                        value={editData.collegeName}
                                        onChange={(e) => updateEditField("collegeName", e.target.value)}
                                    />
                                </div>
                                <div className="detail-row">
                                    <div className="detail-label">Team Members</div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        {editData.members?.map((member, idx) => (
                                            <div key={idx} style={{ display: 'flex', gap: '8px' }}>
                                                <input
                                                    type="text"
                                                    className="edit-input"
                                                    value={member.name}
                                                    onChange={(e) => updateEditMember(idx, "name", e.target.value)}
                                                    placeholder="Name"
                                                    style={{ flex: 1 }}
                                                />
                                                <input
                                                    type="text"
                                                    className="edit-input"
                                                    value={member.phone}
                                                    onChange={(e) => updateEditMember(idx, "phone", e.target.value)}
                                                    placeholder="Phone"
                                                    style={{ width: '120px' }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="detail-row">
                                    <div className="detail-label">UTR Number</div>
                                    <input
                                        type="text"
                                        className="edit-input"
                                        value={editData.utrNumber}
                                        onChange={(e) => updateEditField("utrNumber", e.target.value)}
                                    />
                                </div>
                                <div className="detail-row">
                                    <div className="detail-label">Payment Status</div>
                                    <select
                                        className={`edit-select`}
                                        value={editData.paymentStatus}
                                        onChange={(e) => updateEditField("paymentStatus", e.target.value)}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="completed">Verified</option>
                                    </select>
                                </div>
                                <div className="modal-btns">
                                    <button className="modal-btn secondary" onClick={closeModal}>Cancel</button>
                                    <button className="modal-btn primary" onClick={saveEdits}>Save Changes</button>
                                </div>
                            </div>
                        ) : (
                            <div className="details-container">
                                <div className="detail-row">
                                    <div className="detail-label">Team ID</div>
                                    <div className="detail-value text-gold">#{selectedRegistration.teamNumber}</div>
                                </div>
                                <div className="detail-row">
                                    <div className="detail-label">Event</div>
                                    <div className="detail-value">{selectedRegistration.eventName}</div>
                                </div>
                                <div className="detail-row">
                                    <div className="detail-label">College</div>
                                    <div className="detail-value">{selectedRegistration.collegeName}</div>
                                </div>
                                <div className="detail-row">
                                    <div className="detail-label">Contact Email</div>
                                    <div className="detail-value">{selectedRegistration.email}</div>
                                </div>
                                <div className="detail-row">
                                    <div className="detail-label">Members</div>
                                    {selectedRegistration.members?.map((m, i) => (
                                        <div key={i} className="detail-value" style={{ marginBottom: '4px' }}>
                                            {m.name} <span style={{ color: '#71717a', fontSize: '13px' }}>({m.phone})</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="detail-row">
                                    <div className="detail-label">Registration Fee</div>
                                    <div className="detail-value">{selectedRegistration.registrationFee}</div>
                                </div>
                                <div className="detail-row">
                                    <div className="detail-label">UTR Number</div>
                                    <div className="detail-value font-mono bg-white/5 p-2 rounded inline-block">
                                        {selectedRegistration.utrNumber}
                                    </div>
                                </div>
                                <div className="detail-row">
                                    <div className="detail-label">Payment Status</div>
                                    <select
                                        className={`status-select ${selectedRegistration.paymentStatus === "completed" ? "status-completed" : "status-pending"}`}
                                        value={selectedRegistration.paymentStatus}
                                        onChange={(e) => updatePaymentStatus(selectedRegistration.eventId, selectedRegistration.id, e.target.value)}
                                    >
                                        <option value="pending">Pending Verification</option>
                                        <option value="completed">Verified</option>
                                    </select>
                                </div>
                                <div className="detail-row">
                                    <div className="detail-label">Registered Date</div>
                                    <div className="detail-value">{formatDate(selectedRegistration.registeredAt)}</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className="dashboard">
                <header className="dashboard-header">
                    <div className="header-inner">
                        <h1 className="header-title">
                            <svg width="28" height="28" fill="none" stroke="#d4a843" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                            </svg>
                            <span>SHRESHTA</span> Admin
                            {editMode && <span className="edit-mode-badge">✏️ Edit Mode</span>}
                        </h1>
                        <div className="header-actions">
                            <button
                                className={`edit-btn ${editMode ? 'active' : ''}`}
                                onClick={() => editMode ? setEditMode(false) : setShowPinModal(true)}
                            >
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                {editMode ? "Exit" : "Edit"}
                            </button>
                            <button className="logout-btn" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    </div>
                </header>

                <div className="dashboard-content">
                    {/* Stats */}
                    <div className="stats-grid">
                        <div className="stat-card gold">
                            <div className="stat-label">Total Registrations</div>
                            <div className="stat-value">{stats.total}</div>
                        </div>
                        <div className="stat-card yellow">
                            <div className="stat-label">Pending Verification</div>
                            <div className="stat-value">{stats.pending}</div>
                        </div>
                        <div className="stat-card green">
                            <div className="stat-label">Verified Payments</div>
                            <div className="stat-value">{stats.verified}</div>
                        </div>
                    </div>

                    {/* Filter */}
                    <div className="filter-section">
                        <div className="filter-label">Filter by Event:</div>
                        <select
                            className="filter-select"
                            value={selectedEvent}
                            onChange={(e) => setSelectedEvent(e.target.value)}
                        >
                            <option value="all">All Events</option>
                            {allEvents.map((event) => (
                                <option key={event.id} value={event.id}>
                                    {event.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Table */}
                    <div className="table-container">
                        <div className="table-header">
                            <h2 className="table-title">Registrations</h2>
                            <span className="table-count">{filteredRegistrations.length} teams</span>
                        </div>

                        {loading ? (
                            <div className="loading-container">
                                <div className="loading-spinner" />
                            </div>
                        ) : filteredRegistrations.length === 0 ? (
                            <div className="empty-state">
                                <p>No registrations found</p>
                            </div>
                        ) : (
                            <div className="mobile-scroll">
                                <table className="registrations-table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Event</th>
                                            <th>College</th>
                                            <th>Email</th>
                                            <th className="hide-mobile">Members</th>
                                            <th className="hide-mobile">Fee</th>
                                            <th className="hide-mobile">UTR Number</th>
                                            <th className="hide-mobile">Status</th>
                                            <th className="hide-mobile">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredRegistrations.map((reg) => {
                                            return (
                                                <tr key={`${reg.eventId}-${reg.id}`} onClick={() => handleRowClick(reg)}>
                                                    <td>
                                                        <span className="team-badge">{reg.teamNumber}</span>
                                                    </td>
                                                    <td>
                                                        <span className="event-tag">{reg.eventName}</span>
                                                    </td>
                                                    <td>
                                                        <span className="college-name">{reg.collegeName}</span>
                                                    </td>
                                                    <td>
                                                        <span className="email-text">{reg.email}</span>
                                                    </td>
                                                    <td className="hide-mobile">
                                                        {reg.members?.map((member, idx) => (
                                                            <div key={idx} className="member-item">
                                                                <span className="member-name">{member.name}</span>
                                                                <span className="member-phone">{member.phone}</span>
                                                            </div>
                                                        ))}
                                                    </td>
                                                    <td className="hide-mobile">{reg.registrationFee}</td>
                                                    <td className="hide-mobile">
                                                        <span className="utr-number">{reg.utrNumber}</span>
                                                    </td>
                                                    <td className="hide-mobile">
                                                        <span
                                                            className={`status-select ${reg.paymentStatus === "completed" ? "status-completed" : "status-pending"}`}
                                                            style={{ padding: '6px 10px', display: 'inline-block' }}
                                                        >
                                                            {reg.paymentStatus === "completed" ? "Verified" : "Pending"}
                                                        </span>
                                                    </td>
                                                    <td className="hide-mobile">
                                                        <span className="date-text">{formatDate(reg.registeredAt)}</span>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
