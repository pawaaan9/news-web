import { Mail, Phone, Facebook } from 'lucide-react';
import { BsWhatsapp, BsTwitterX, BsInstagram, BsLinkedin } from 'react-icons/bs';

interface AdProfileLinksProps {
  title: string;
  email: string;
  phone: string;
  whatsapp: string;
  facebook: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
}

const AdProfileLinks: React.FC<AdProfileLinksProps> = ({ 
  title, 
  email, 
  phone, 
  whatsapp, 
  facebook,
  twitter,
  instagram,
  linkedin
}) => {
  const socialButtons = [
    { 
      color: "bg-blue-500", 
      icon: <Facebook size={16} />,
      link: facebook,
      visible: !!facebook,
      label: "Facebook"
    },
    { 
      color: "bg-black", 
      icon: <BsTwitterX size={16} />,
      link: twitter,
      visible: !!twitter,
      label: "Twitter"
    },
    { 
      color: "bg-pink-500", 
      icon: <BsInstagram size={16} />,
      link: instagram,
      visible: !!instagram,
      label: "Instagram"
    },
    { 
      color: "bg-blue-600", 
      icon: <BsLinkedin size={16} />,
      link: linkedin,
      visible: !!linkedin,
      label: "LinkedIn"
    }
  ].filter(button => button.visible);

  return (
    <div className="w-full bg-accent-teal rounded-lg p-4 shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
        <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-0 text-white">{title}</h2>
        
        <div className="flex flex-wrap gap-2">
          {socialButtons.map((button, index) => (
            <a 
              key={index} 
              href={button.link} 
              target="_blank"
              rel="noopener noreferrer"
              aria-label={button.label}
              className={`${button.color} w-8 h-8 rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity`}
            >
              {button.icon}
            </a>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-4">
        <div className="bg-gray-50 p-3 rounded flex items-center">
          <Mail className="text-gray-600 mr-2" size={18} />
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Email:</span>
            <a href={`mailto:${email}`} className="text-sm text-charcoal font-bold hover:underline">
              {email}
            </a>
          </div>
        </div>
        
        <div className="bg-gray-50 p-3 rounded flex items-center">
          <Phone className="text-gray-600 mr-2" size={18} />
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Phone:</span>
            <a href={`tel:${phone}`} className="text-sm text-charcoal hover:underline font-bold">
              {phone}
            </a>
          </div>
        </div>
        
        <div className="bg-gray-50 p-3 rounded flex items-center">
          <BsWhatsapp className="text-gray-600 mr-2" size={18} />
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">WhatsApp:</span>
            <a href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`} className="text-sm text-charcoal font-bold hover:underline">
              {whatsapp}
            </a>
          </div>
        </div>
      </div>
      
      {facebook && (
        <div className="mt-2">
          <div className="bg-gray-50 p-3 rounded flex items-center">
            <Facebook className="text-gray-600 mr-2" size={18} />
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">Facebook:</span>
              <a href={facebook} target="_blank" rel="noopener noreferrer" className="text-sm text-charcoal font-bold hover:underline">
                {facebook}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdProfileLinks;