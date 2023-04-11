import { AiOutlineClose } from "react-icons/ai";

export default function ProfileMod({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: any;
}) {
  const modalStyles: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    zIndex: 50,
    overflow: "auto",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: isOpen ? "block" : "none",
  };

  const contentStyles: React.CSSProperties = {
    position: "absolute",
    top: "55%",
    left: "50%",
    width: "950px",
    minWidth: "300px",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#1d2226",
    borderRadius: "20px",
    boxShadow: "#fff",
    padding: "1rem",
  };

  return (
    <div style={modalStyles}>
      <div style={contentStyles}>
        <div
          onClick={onClose}
          className="absolute right-2 top-2  rounded-full bg-white p-2 text-black"
        >
          <AiOutlineClose />
        </div>
        {children}
      </div>
    </div>
  );
}
