import React, { useState, useCallback, useMemo } from "react";
import { AutoSkeletonLoader } from "../components/organisms/AutoSkeletonLoader";

// Mock translation hook (simulates useTranslation)
const useTranslation = () => {
    return {
        t: (key: string) => {
            const translations: Record<string, string> = {
                "worker.available": "Available",
                "worker.unavailable": "Unavailable",
                "worker.nationality": "Nationality",
                "worker.religion": "Religion",
                "worker.experience": "Experience",
                "worker.age": "Age",
                "worker.recruitmentPrice": "Recruitment Price",
                "worker.bookNow": "Book Now",
                "worker.muslim": "Muslim",
                "worker.noneMuslim": "Non-Muslim",
                "worker.newcomer": "Newcomer",
                "worker.experienced": "Experienced",
                "worker.years": "years",
            };
            return translations[key] || key;
        },
    };
};

// Mock Worker Data Interface
interface IWorker {
    id: number;
    name: string;
    professionName: string;
    nationalityName: string;
    religion: number;
    experience: string;
    age: number;
    recruitmentPrice: number;
    isActive: boolean;
    cvImageUrl: string | null;
}

// Badge Atom Component
const BadgeAtom: React.FC<{ text: string; variant: "success" | "danger"; size: string }> = ({ text, variant, size }) => {
    const { t } = useTranslation();
    return (
        <span
            style={{
                padding: "4px 12px",
                borderRadius: "12px",
                fontSize: size === "small" ? "12px" : "14px",
                fontWeight: "600",
                backgroundColor: variant === "success" ? "#10b981" : "#ef4444",
                color: "white",
                height: "fit-content",
            }}
        >
            {t(text)}
        </span>
    );
};

// Text Atom Component  
const BaseTextAtom: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
    return <span className={className}>{children}</span>;
};

// Button Atom Component
const BaseButtonAtom: React.FC<{
    text: string;
    onClick: () => void;
    disabled?: boolean;
    Icon?: React.ReactNode;
}> = ({ text, onClick, disabled, Icon }) => {
    const { t } = useTranslation();
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            style={{
                width: "100%",
                height: "48px",
                borderRadius: "12px",
                backgroundColor: disabled ? "#d1d5db" : "#195950",
                color: "white",
                border: "none",
                cursor: disabled ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                fontSize: "14px",
                fontWeight: "600",
                transition: "all 0.3s",
            }}
        >
            {t(text)} {Icon}
        </button>
    );
};

// Complex Worker Card Molecule - Wrapped in React.memo and uses multiple hooks
const WorkerCardMolecule: React.FC<{
    workerData: IWorker;
    bookNowHandler: () => void;
}> = React.memo(({ workerData, bookNowHandler }) => {
    const [isHovered, setIsHovered] = useState(false);
    const { t } = useTranslation();

    const handleBookNow = useCallback(() => {
        bookNowHandler();
    }, [bookNowHandler]);

    const getReligionName = useCallback(
        (id: number) => {
            switch (id) {
                case 1:
                    return t("worker.muslim");
                case 2:
                    return t("worker.noneMuslim");
                default:
                    return "Other";
            }
        },
        [t]
    );

    const experienceLabel = useMemo(() => {
        return workerData.experience === "new" ? t("worker.newcomer") : t("worker.experienced");
    }, [workerData.experience, t]);

    return (
        <div
            style={{
                backgroundColor: "white",
                borderRadius: "12px",
                padding: "16px",
                border: "1px solid #e5e7eb",
                boxShadow: isHovered ? "0 8px 30px rgba(0,0,0,0.12)" : "0 2px 15px rgba(0,0,0,0.07)",
                transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                transition: "all 0.3s",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
                <div style={{ display: "flex", gap: "12px" }}>
                    {workerData.cvImageUrl ? (
                        <img
                            src={workerData.cvImageUrl}
                            alt={workerData.name}
                            style={{
                                width: "56px",
                                height: "56px",
                                borderRadius: "8px",
                                objectFit: "cover",
                                border: "3px solid white",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                            }}
                        />
                    ) : (
                        <div
                            style={{
                                width: "56px",
                                height: "56px",
                                borderRadius: "8px",
                                backgroundColor: "#f3f4f6",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            👤
                        </div>
                    )}
                    <div>
                        <BaseTextAtom className="text-base font-bold text-[#195950]">{workerData.name}</BaseTextAtom>
                        <BaseTextAtom className="text-xs text-gray-600">{workerData.professionName}</BaseTextAtom>
                    </div>
                </div>
                <BadgeAtom text={workerData.isActive ? "worker.available" : "worker.unavailable"} variant={workerData.isActive ? "success" : "danger"} size="small" />
            </div>

            {/* Info Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                    <BaseTextAtom className="text-xs text-gray-400">🌍 {t("worker.nationality")}</BaseTextAtom>
                    <BaseTextAtom className="text-sm font-bold">{workerData.nationalityName}</BaseTextAtom>
                </div>
                <div>
                    <BaseTextAtom className="text-xs text-gray-400">🪪 {t("worker.religion")}</BaseTextAtom>
                    <BaseTextAtom className="text-sm font-bold">{getReligionName(workerData.religion)}</BaseTextAtom>
                </div>
                <div>
                    <BaseTextAtom className="text-xs text-gray-400">💼 {t("worker.experience")}</BaseTextAtom>
                    <BaseTextAtom className="text-sm font-bold">{experienceLabel}</BaseTextAtom>
                </div>
                <div>
                    <BaseTextAtom className="text-xs text-gray-400">📅 {t("worker.age")}</BaseTextAtom>
                    <BaseTextAtom className="text-sm font-bold">
                        {workerData.age} {t("worker.years")}
                    </BaseTextAtom>
                </div>
            </div>

            {/* Footer */}
            <div style={{ borderTop: "1px dashed #e5e7eb", paddingTop: "16px" }}>
                <div style={{ marginBottom: "12px" }}>
                    <BaseTextAtom className="text-xs text-gray-400">💳 {t("worker.recruitmentPrice")}</BaseTextAtom>
                    <BaseTextAtom className="text-sm font-bold">
                        {workerData.recruitmentPrice?.toLocaleString()} SAR
                    </BaseTextAtom>
                </div>
                <BaseButtonAtom text="worker.bookNow" onClick={handleBookNow} disabled={!workerData.isActive} Icon={<>→</>} />
            </div>
        </div>
    );
});

WorkerCardMolecule.displayName = "WorkerCardMolecule";

// Main Example Component
export const AutoSkeletonV2Example: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);

    const mockWorkers: IWorker[] = [
        {
            id: 1,
            name: "Mohamed Ahmed",
            professionName: "Software Engineer",
            nationalityName: "Egypt",
            religion: 1,
            experience: "experienced",
            age: 30,
            recruitmentPrice: 25000,
            isActive: true,
            cvImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        },
        {
            id: 2,
            name: "Hassan Mahmoud",
            professionName: "Private Driver",
            nationalityName: "Egypt",
            religion: 1,
            experience: "experienced",
            age: 42,
            recruitmentPrice: 12000,
            isActive: true,
            cvImageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
        },
        {
            id: 3,
            name: "Omar Ibrahim",
            professionName: "Electrical Technician",
            nationalityName: "Egypt",
            religion: 1,
            experience: "new",
            age: 26,
            recruitmentPrice: 15000,
            isActive: false,
            cvImageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
        },
    ];

    const handleBookNow = (worker: IWorker) => {
        alert(`Booking worker: ${worker.name}`);
    };

    return (
        <div style={{ padding: "40px 20px", backgroundColor: "#f9fafb", minHeight: "100vh" }}>
            {/* Header */}
            <div style={{ maxWidth: "1200px", margin: "0 auto", marginBottom: "32px" }}>
                <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "12px", color: "#111827" }}>
                    🎉 AutoSkeletonLoader v2.4.0 - Advanced Virtual Traversal
                </h1>
                <p style={{ fontSize: "16px", color: "#6b7280", marginBottom: "24px" }}>
                    Testing React.memo, forwardRef, hooks-heavy components, and continuous shimmer animation
                </p>

                {/* Controls */}
                <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
                    <button
                        onClick={() => setIsLoading(!isLoading)}
                        style={{
                            padding: "12px 24px",
                            backgroundColor: "#3b82f6",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            fontWeight: "600",
                            cursor: "pointer",
                        }}
                    >
                        {isLoading ? "✅ Show Content" : "⏳ Show Skeleton"}
                    </button>
                    <div
                        style={{
                            padding: "12px 24px",
                            backgroundColor: isLoading ? "#fef3c7" : "#d1fae5",
                            borderRadius: "8px",
                            fontWeight: "600",
                            color: isLoading ? "#92400e" : "#065f46",
                        }}
                    >
                        Status: {isLoading ? "Loading (Skeleton Active)" : "Content Loaded"}
                    </div>
                </div>

                {/* Feature Highlights */}
                <div
                    style={{
                        backgroundColor: "white",
                        borderRadius: "12px",
                        padding: "20px",
                        marginBottom: "32px",
                        border: "1px solid #e5e7eb",
                    }}
                >
                    <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "12px" }}>✨ v2.4.0 Features Being Tested:</h3>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        <li style={{ padding: "8px 0", color: "#059669" }}>✅ React.memo wrapped component (WorkerCardMolecule)</li>
                        <li style={{ padding: "8px 0", color: "#059669" }}>✅ Multiple hooks (useState, useCallback, useMemo, useTranslation)</li>
                        <li style={{ padding: "8px 0", color: "#059669" }}>✅ Safe rendering with hooks error handling</li>
                        <li style={{ padding: "8px 0", color: "#059669" }}>✅ Smart fallback dimensions (Button, Badge, Text atoms)</li>
                        <li style={{ padding: "8px 0", color: "#059669" }}>✅ Stable keys for continuous shimmer animation</li>
                        <li style={{ padding: "8px 0", color: "#059669" }}>✅ GPU-accelerated transform animation (60 FPS)</li>
                    </ul>
                </div>
            </div>

            {/* Worker Cards Grid */}
            <div
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "24px",
                }}
            >
                {mockWorkers.map((worker) => (
                    <div key={worker.id}>
                        <AutoSkeletonLoader
                            className="w-full h-full"
                            loading={isLoading}
                            color="#e5e7eb"
                            highlightColor="#f3f4f6"
                            inheritStyles
                            component={<WorkerCardMolecule workerData={worker} bookNowHandler={() => handleBookNow(worker)} />}
                        />
                    </div>
                ))}
            </div>

            {/* Console Instructions */}
            <div
                style={{
                    maxWidth: "1200px",
                    margin: "32px auto 0",
                    backgroundColor: "#1f2937",
                    color: "#f3f4f6",
                    padding: "20px",
                    borderRadius: "12px",
                    fontFamily: "monospace",
                }}
            >
                <div style={{ fontWeight: "bold", marginBottom: "8px" }}>🔍 Open DevTools Console to verify:</div>
                <ul style={{ margin: 0, paddingLeft: "20px" }}>
                    <li>No "Invalid hook call" errors ✅</li>
                    <li>Continuous shimmer animation (no flickering) ✅</li>
                    <li>Stable skeleton keys logged ✅</li>
                </ul>
            </div>
        </div>
    );
};
