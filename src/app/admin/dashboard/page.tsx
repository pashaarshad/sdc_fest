"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { collection, query, orderBy, onSnapshot, doc, updateDoc, getDocs } from "firebase/firestore";
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
    transactionId: string;
    paymentStatus: string;
    registeredAt: any;
}

export default function AdminDashboard() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<string>("all");
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ total: 0, pending: 0, verified: 0 });
    const router = useRouter();

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
                    snapshot.forEach((doc) => {
                        allRegs.push({
                            id: doc.id,
                            eventId: event.id,
                            ...doc.data()
                        } as Registration);
                    });
                } catch (error) {
                    console.error(`Error fetching ${event.id}:`, error);
                }
            }

            // Sort by registration time (newest first)
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

    // Filter registrations
    const filteredRegistrations = selectedEvent === "all"
        ? registrations
        : registrations.filter(r => r.eventId === selectedEvent);

    // Update payment status
    const updatePaymentStatus = async (eventId: string, docId: string, status: string) => {
        try {
            const docRef = doc(db, "registrations", eventId, "teams", docId);
            await updateDoc(docRef, { paymentStatus: status });

            // Update local state
            setRegistrations(prev => prev.map(r =>
                r.id === docId && r.eventId === eventId
                    ? { ...r, paymentStatus: status }
                    : r
            ));

            // Update stats
            setStats(prev => ({
                ...prev,
                pending: status === "completed" ? prev.pending - 1 : prev.pending + 1,
                verified: status === "completed" ? prev.verified + 1 : prev.verified - 1
            }));
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Failed to update status");
        }
    };

    // Logout
    const handleLogout = () => {
        sessionStorage.removeItem("adminLoggedIn");
        router.push("/admin");
    };

    // Format date
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

                .header-title span {
                    color: #d4a843;
                }

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

                .logout-btn:hover {
                    background: rgba(239, 68, 68, 0.2);
                }

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

                .stat-value {
                    font-size: 36px;
                    font-weight: 800;
                    color: #fff;
                }

                .stat-card.gold .stat-value {
                    color: #d4a843;
                }

                .stat-card.green .stat-value {
                    color: #4ade80;
                }

                .stat-card.yellow .stat-value {
                    color: #fbbf24;
                }

                .filter-section {
                    margin-bottom: 24px;
                }

                .filter-label {
                    font-size: 14px;
                    color: #a1a1aa;
                    margin-bottom: 12px;
                }

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

                .filter-select:focus {
                    outline: none;
                    border-color: rgba(212, 168, 67, 0.5);
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

                .table-title {
                    font-size: 18px;
                    font-weight: 700;
                    color: #fff;
                }

                .table-count {
                    font-size: 14px;
                    color: #d4a843;
                }

                .registrations-table {
                    width: 100%;
                    border-collapse: collapse;
                }

                .registrations-table th {
                    text-align: left;
                    padding: 14px 20px;
                    font-size: 11px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    color: #d4a843;
                    background: rgba(0, 0, 0, 0.3);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                }

                .registrations-table td {
                    padding: 16px 20px;
                    font-size: 14px;
                    color: #a1a1aa;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
                    vertical-align: top;
                }

                .registrations-table tr:hover td {
                    background: rgba(255, 255, 255, 0.02);
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

                .college-name {
                    color: #e4e4e7;
                    font-weight: 500;
                }

                .email-text {
                    font-size: 12px;
                    color: #71717a;
                }

                .member-item {
                    font-size: 12px;
                    padding: 2px 0;
                }

                .member-name {
                    color: #e4e4e7;
                }

                .member-phone {
                    color: #71717a;
                    margin-left: 8px;
                }

                .transaction-id {
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

                .status-pending {
                    background: rgba(234, 179, 8, 0.15);
                    color: #fbbf24;
                    border: 1px solid rgba(234, 179, 8, 0.3);
                }

                .status-completed {
                    background: rgba(34, 197, 94, 0.15);
                    color: #4ade80;
                    border: 1px solid rgba(34, 197, 94, 0.3);
                }

                .date-text {
                    font-size: 12px;
                    color: #71717a;
                }

                .loading-container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 80px 20px;
                }

                .loading-spinner {
                    width: 50px;
                    height: 50px;
                    border: 4px solid rgba(212, 168, 67, 0.2);
                    border-top-color: #d4a843;
                    border-radius: 50%;
                    animation: spin 0.8s linear infinite;
                }

                @keyframes spin {
                    to { transform: rotate(360deg); }
                }

                .empty-state {
                    text-align: center;
                    padding: 80px 20px;
                    color: #71717a;
                }

                .mobile-scroll {
                    overflow-x: auto;
                }

                @media (max-width: 768px) {
                    .header-title {
                        font-size: 18px;
                    }

                    .stats-grid {
                        grid-template-columns: 1fr 1fr;
                    }

                    .filter-select {
                        width: 100%;
                    }
                }
            `}</style>

            <div className="dashboard">
                <header className="dashboard-header">
                    <div className="header-inner">
                        <h1 className="header-title">
                            <svg width="28" height="28" fill="none" stroke="#d4a843" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                            </svg>
                            <span>SHRESHTA</span> Admin Dashboard
                        </h1>
                        <button className="logout-btn" onClick={handleLogout}>
                            Logout
                        </button>
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
                                            <th>Members</th>
                                            <th>Fee</th>
                                            <th>Transaction ID</th>
                                            <th>Status</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredRegistrations.map((reg) => (
                                            <tr key={`${reg.eventId}-${reg.id}`}>
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
                                                <td>
                                                    {reg.members?.map((member, idx) => (
                                                        <div key={idx} className="member-item">
                                                            <span className="member-name">{member.name}</span>
                                                            <span className="member-phone">{member.phone}</span>
                                                        </div>
                                                    ))}
                                                </td>
                                                <td>{reg.registrationFee}</td>
                                                <td>
                                                    <span className="transaction-id">{reg.transactionId}</span>
                                                </td>
                                                <td>
                                                    <select
                                                        className={`status-select ${reg.paymentStatus === "completed" ? "status-completed" : "status-pending"}`}
                                                        value={reg.paymentStatus}
                                                        onChange={(e) => updatePaymentStatus(reg.eventId, reg.id, e.target.value)}
                                                    >
                                                        <option value="pending">Pending</option>
                                                        <option value="completed">Verified</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <span className="date-text">{formatDate(reg.registeredAt)}</span>
                                                </td>
                                            </tr>
                                        ))}
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
