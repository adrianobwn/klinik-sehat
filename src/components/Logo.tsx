import logoImage from '@/assets/logo.png';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Logo = ({ className = "", showText = true, size = 'md' }: LogoProps) => {
  const sizes = {
    sm: { logo: 'h-16', text: 'text-lg' },
    md: { logo: 'h-24', text: 'text-2xl' },
    lg: { logo: 'h-32', text: 'text-3xl' },
  };

  const currentSize = sizes[size];

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Logo Image */}
      <img 
        src={logoImage} 
        alt="Klinik Sehat Logo" 
        className={`${currentSize.logo} w-auto object-contain drop-shadow-md`}
      />

      {/* Text */}
      {showText && (
        <div className="flex flex-col leading-tight">
          <span className={`${currentSize.text} font-bold bg-gradient-primary bg-clip-text text-transparent`}>
            Klinik Sehat
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
