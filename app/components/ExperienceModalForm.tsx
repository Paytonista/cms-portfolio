interface ExperienceModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const ExperienceModalForm = ({ isOpen, onClose, title, children }: ExperienceModalFormProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className={`absolute inset-0 bg-black/50 backdrop-blur-sm backdrop:blur transition-all duration-200 ${isOpen ? "opacity-100" : "opacity-0"}`} 
             onClick={onClose}/>
        {children}
        </div>
    
  );
};

export default ExperienceModalForm;