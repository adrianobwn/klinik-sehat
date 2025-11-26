import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Eye, EyeOff, Lock, Mail, User, Phone, Calendar, MapPin, IdCard, Stethoscope, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface RegisterFormProps {
  onSubmit: (data: any) => Promise<void>;
  loading: boolean;
}

const RegisterForm = ({ onSubmit, loading }: RegisterFormProps) => {
  // Basic fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState<"pasien" | "dokter" | "admin">("pasien");
  
  // Pasien specific
  const [nik, setNik] = useState("");
  
  // Dokter specific
  const [specialization, setSpecialization] = useState("");
  const [sip, setSip] = useState("");
  
  // UI state
  const [showPassword, setShowPassword] = useState(false);
  
  // Validation states
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nikError, setNikError] = useState("");
  
  // Password strength
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    label: "",
    color: "",
    checks: {
      length: false,
      uppercase: false,
      lowercase: false,
      number: false
    }
  });

  // Phone validation
  const validatePhone = (value: string) => {
    if (!value) {
      setPhoneError("");
      return;
    }

    // Only numbers
    if (!/^[0-9]+$/.test(value)) {
      setPhoneError("Nomor telepon hanya boleh berisi angka");
      return;
    }

    // Length check
    if (value.length < 10) {
      setPhoneError("Nomor telepon minimal 10 digit");
      return;
    }

    if (value.length > 13) {
      setPhoneError("Nomor telepon maksimal 13 digit");
      return;
    }

    setPhoneError("");
  };

  // Password validation
  const validatePassword = (value: string) => {
    const checks = {
      length: value.length >= 8,
      uppercase: /[A-Z]/.test(value),
      lowercase: /[a-z]/.test(value),
      number: /[0-9]/.test(value)
    };

    const score = Object.values(checks).filter(Boolean).length;
    
    let label = "";
    let color = "";
    
    if (score === 0) {
      label = "";
      color = "";
    } else if (score <= 2) {
      label = "Lemah";
      color = "text-red-500";
    } else if (score === 3) {
      label = "Sedang";
      color = "text-orange-500";
    } else {
      label = "Kuat";
      color = "text-green-500";
    }

    setPasswordStrength({ score, label, color, checks });

    // Error messages
    if (!value) {
      setPasswordError("");
      return;
    }

    if (!checks.length) {
      setPasswordError("Password minimal 8 karakter");
      return;
    }

    if (!checks.uppercase || !checks.lowercase) {
      setPasswordError("Password harus mengandung huruf besar dan kecil");
      return;
    }

    if (!checks.number) {
      setPasswordError("Password harus mengandung angka");
      return;
    }

    setPasswordError("");
  };

  // NIK validation
  const validateNIK = (value: string) => {
    if (!value) {
      setNikError("");
      return;
    }

    if (!/^[0-9]+$/.test(value)) {
      setNikError("NIK hanya boleh berisi angka");
      return;
    }

    if (value.length !== 16) {
      setNikError("NIK harus 16 digit");
      return;
    }

    setNikError("");
  };

  const handlePhoneChange = (value: string) => {
    // Only allow numbers
    const cleaned = value.replace(/[^0-9]/g, "");
    if (cleaned.length <= 13) {
      setPhone(cleaned);
      validatePhone(cleaned);
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    validatePassword(value);
  };

  const handleNIKChange = (value: string) => {
    const cleaned = value.replace(/[^0-9]/g, "");
    if (cleaned.length <= 16) {
      setNik(cleaned);
      validateNIK(cleaned);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Final validation
    validatePhone(phone);
    validatePassword(password);
    if (role === "pasien") {
      validateNIK(nik);
    }

    // Check for errors
    if (phoneError || passwordError || (role === "pasien" && nikError)) {
      return;
    }

    const data: any = {
      email,
      password,
      full_name: fullName,
      phone,
      address,
      date_of_birth: dateOfBirth,
      gender,
      role
    };

    if (role === "pasien") {
      data.nik = nik;
    }

    if (role === "dokter") {
      data.specialization = specialization;
      data.sip = sip;
    }

    await onSubmit(data);
  };

  const ValidationIcon = ({ isValid, isTouched }: { isValid: boolean; isTouched: boolean }) => {
    if (!isTouched) return null;
    return isValid ? (
      <CheckCircle2 className="w-5 h-5 text-green-500" />
    ) : (
      <XCircle className="w-5 h-5 text-red-500" />
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Role Selection - Full Width */}
      <div className="space-y-2">
        <Label htmlFor="role" className="text-foreground font-medium">
          Daftar Sebagai <span className="text-red-500">*</span>
        </Label>
        <Select value={role} onValueChange={(value: any) => setRole(value)}>
          <SelectTrigger className="bg-background/50 border-border focus:border-primary h-11">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pasien">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                Pasien
              </div>
            </SelectItem>
            <SelectItem value="dokter">
              <div className="flex items-center">
                <Stethoscope className="w-4 h-4 mr-2" />
                Dokter
              </div>
            </SelectItem>
            <SelectItem value="admin">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                Admin
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 2-Column Layout for Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Full Name */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="fullName" className="text-foreground font-medium">
            Nama Lengkap <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="fullName"
              type="text"
              placeholder="Contoh: Ahmad Wijaya"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="pl-9 h-11 bg-background/50 border-border focus:border-primary"
              required
            />
          </div>
        </div>

        {/* NIK (only for pasien) */}
        <AnimatePresence>
          {role === "pasien" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2 md:col-span-2"
            >
              <Label htmlFor="nik" className="text-foreground font-medium">
                NIK <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="nik"
                  type="text"
                  placeholder="16 digit angka"
                  value={nik}
                  onChange={(e) => handleNIKChange(e.target.value)}
                  className={`pl-9 pr-10 h-11 bg-background/50 border-border focus:border-primary ${
                    nikError ? "border-red-500" : nik.length === 16 ? "border-green-500" : ""
                  }`}
                  required
                  maxLength={16}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <ValidationIcon isValid={!nikError && nik.length === 16} isTouched={nik.length > 0} />
                </div>
              </div>
              {(nikError || (nik.length > 0 && nik.length < 16)) && (
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  {nikError ? <AlertCircle className="w-3 h-3 text-red-500" /> : null}
                  {nikError || `${nik.length}/16 digit`}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Specialization & SIP (only for dokter) */}
        <AnimatePresence>
          {role === "dokter" && (
            <>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                <Label htmlFor="specialization" className="text-foreground font-medium">
                  Spesialisasi <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="specialization"
                    type="text"
                    placeholder="Contoh: Penyakit Dalam"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    className="pl-9 h-11 bg-background/50 border-border focus:border-primary"
                    required
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                <Label htmlFor="sip" className="text-foreground font-medium">
                  Nomor SIP <span className="text-xs text-muted-foreground">(Opsional)</span>
                </Label>
                <div className="relative">
                  <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="sip"
                    type="text"
                    placeholder="Contoh: SIP-001-2024"
                    value={sip}
                    onChange={(e) => setSip(e.target.value)}
                    className="pl-9 h-11 bg-background/50 border-border focus:border-primary"
                  />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground font-medium">
            Email <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-9 h-11 bg-background/50 border-border focus:border-primary"
              required
            />
          </div>
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-foreground font-medium">
            Nomor Telepon <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="phone"
              type="tel"
              placeholder="08123456789"
              value={phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              className={`pl-9 pr-10 h-11 bg-background/50 border-border focus:border-primary ${
                phoneError ? "border-red-500" : phone.length >= 10 && !phoneError ? "border-green-500" : ""
              }`}
              required
              maxLength={13}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <ValidationIcon isValid={!phoneError && phone.length >= 10} isTouched={phone.length > 0} />
            </div>
          </div>
          {phoneError && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {phoneError}
            </p>
          )}
          {phone.length > 0 && !phoneError && phone.length >= 10 && (
            <p className="text-xs text-green-600 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Valid ({phone.length} digit)
            </p>
          )}
        </div>

        {/* Date of Birth */}
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth" className="text-foreground font-medium">
            Tanggal Lahir
          </Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="dateOfBirth"
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="pl-9 h-11 bg-background/50 border-border focus:border-primary"
            />
          </div>
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <Label htmlFor="gender" className="text-foreground font-medium">
            Jenis Kelamin
          </Label>
          <Select value={gender} onValueChange={setGender}>
            <SelectTrigger className="bg-background/50 border-border focus:border-primary h-11">
              <SelectValue placeholder="Pilih" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Laki-laki">Laki-laki</SelectItem>
              <SelectItem value="Perempuan">Perempuan</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Address - Full Width */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="address" className="text-foreground font-medium">
            Alamat
          </Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Textarea
              id="address"
              placeholder="Jl. Contoh No. 123, Kota"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="pl-9 bg-background/50 border-border focus:border-primary min-h-[70px] resize-none"
            />
          </div>
        </div>
      </div>

      {/* Password Section */}
      <div className="space-y-2">
        <Label htmlFor="password" className="text-foreground font-medium">
          Password <span className="text-red-500">*</span>
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Minimal 8 karakter"
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            className={`pl-9 pr-10 h-11 bg-background/50 border-border focus:border-primary ${
              passwordError ? "border-red-500" : passwordStrength.score === 4 ? "border-green-500" : ""
            }`}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {/* Password Strength Indicator - Compact */}
        {password.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className={`h-full ${
                    passwordStrength.score <= 2 ? "bg-red-500" :
                    passwordStrength.score === 3 ? "bg-orange-500" : "bg-green-500"
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${(passwordStrength.score / 4) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              {passwordStrength.label && (
                <span className={`text-xs font-medium ${passwordStrength.color}`}>
                  {passwordStrength.label}
                </span>
              )}
            </div>

            {/* Password Requirements Checklist - Compact Grid */}
            <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
              <div className={`flex items-center gap-1.5 ${passwordStrength.checks.length ? "text-green-600" : "text-muted-foreground"}`}>
                {passwordStrength.checks.length ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                <span>Min 8 char</span>
              </div>
              <div className={`flex items-center gap-1.5 ${passwordStrength.checks.uppercase ? "text-green-600" : "text-muted-foreground"}`}>
                {passwordStrength.checks.uppercase ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                <span>Huruf besar</span>
              </div>
              <div className={`flex items-center gap-1.5 ${passwordStrength.checks.lowercase ? "text-green-600" : "text-muted-foreground"}`}>
                {passwordStrength.checks.lowercase ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                <span>Huruf kecil</span>
              </div>
              <div className={`flex items-center gap-1.5 ${passwordStrength.checks.number ? "text-green-600" : "text-muted-foreground"}`}>
                {passwordStrength.checks.number ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                <span>Angka</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={loading || !!phoneError || !!passwordError || (role === "pasien" && !!nikError)}
        className="w-full bg-gradient-primary hover:shadow-glow-primary transition-all duration-300 h-11 font-medium mt-2"
      >
        {loading ? "Memproses..." : "Daftar Sekarang"}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        <span className="text-red-500">*</span> = Wajib diisi
      </p>
    </form>
  );
};

export default RegisterForm;
