import Button from "./Button";
interface ModalProps {
  message: string;
  onClose: () => void;
  visible: boolean;
}

const Modal: React.FC<ModalProps> = ({ message, onClose, visible }) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-xl text-blue-700">{message}</p>
        <Button
          className="mt-4 bg-blue-700 text-white py-2 px-4 rounded"
          onClick={onClose}
          label="Close"
        />
    
      </div>
    </div>
  );
};

export default Modal;
