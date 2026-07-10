interface ExperienceModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const ExperienceModalForm = ({ isOpen, onClose, title, children }: ExperienceModalFormProps) => {

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-200 ${
                     isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}>
        <div className={`absolute inset-0 bg-black/50 backdrop-blur-sm backdrop:blur transition-all duration-200 ${
                         isOpen ? "opacity-100" : "opacity-0"}`} 
             onClick={onClose}/>
       
          <div className="relative z-10 bg-white  w-full rounded-xl shadow-xl max-w-lg mx-4">
            <div className=" font-semibold px-4 py-2 bg-[#041423] text-white rounded-t-xl">
              <h2 className="text-xl"> {title} </h2>
              
            </div>
            <div className="p-6 space-y-4">
            {children}
            </div>   
          </div>         

      </div>
    
  );
};

export default ExperienceModalForm;