import Button from "./Button";

interface ModalProps {
  message: string;
  onClose: () => void;
  visible: boolean;
}

const Modal: React.FC<ModalProps> = ({ message, onClose, visible }) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 transition-opacity">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-80 text-center">
        <p className="text-lg text-gray-800 font-semibold">{message}</p>
        <Button
          className="mt-6 bg-blue-950 hover:bg-blue-600 text-white py-2 px-6 rounded-lg transition-all duration-200"
          onClick={onClose}
          label="Close"
        />
      </div>
    </div>
  );
};

export default Modal;
