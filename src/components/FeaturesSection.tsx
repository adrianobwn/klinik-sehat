import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  Users,
  Calendar,
  FileText,
  Video,
  Bell,
  History,
  LayoutDashboard,
  Activity,
  UserCheck,
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: LayoutDashboard,
      title: "Dashboard Klinik",
      description: "Monitor semua aktivitas klinik dalam satu tampilan. Lihat statistik real-time dan kelola operasional dengan mudah.",
      color: "from-purple-500 to-violet-500",
    },
    {
      icon: Users,
      title: "Nomor Antrian Digital",
      description: "Sistem antrian otomatis yang mengurangi kerumunan. Pasien dapat melihat nomor antrian secara real-time.",
      color: "from-violet-500 to-fuchsia-500",
    },
    {
      icon: Calendar,
      title: "Pendaftaran Online",
      description: "Pasien dapat mendaftar dari rumah. Pilih dokter, jadwal, dan konfirmasi dalam hitungan detik.",
      color: "from-fuchsia-500 to-pink-500",
    },
    {
      icon: FileText,
      title: "Rekam Medis Digital",
      description: "Simpan dan akses rekam medis dengan aman. Riwayat kesehatan lengkap dalam satu sistem terintegrasi.",
      color: "from-pink-500 to-purple-500",
    },
    {
      icon: Video,
      title: "Konsultasi Online",
      description: "Layanan telemedicine untuk konsultasi jarak jauh. Video call HD dengan dokter kapan saja.",
      color: "from-purple-500 to-indigo-500",
    },
    {
      icon: Bell,
      title: "Notifikasi Real-time",
      description: "Dapatkan update instan melalui SMS, email, atau push notification. Tidak ada lagi antrian terlewat.",
      color: "from-indigo-500 to-blue-500",
    },
    {
      icon: History,
      title: "Riwayat Kunjungan",
      description: "Lacak seluruh riwayat kunjungan pasien. Analisis tren dan pola untuk pelayanan lebih baik.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: UserCheck,
      title: "Manajemen Dokter",
      description: "Kelola jadwal dan availability dokter. Optimalisasi beban kerja tim medis Anda.",
      color: "from-cyan-500 to-teal-500",
    },
    {
      icon: Activity,
      title: "Analitik & Laporan",
      description: "Dashboard analytics komprehensif. Export laporan untuk evaluasi dan pengambilan keputusan.",
      color: "from-teal-500 to-purple-500",
    },
  ];

  return (
    <section className="py-24 bg-gradient-dark relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="px-4 py-2 bg-secondary/50 border border-primary/30 rounded-full text-sm text-primary font-medium backdrop-blur-sm inline-block mb-4">
            ✨ Fitur Lengkap
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Semua yang Anda Butuhkan
            </span>
            <br />
            <span className="text-foreground">Dalam Satu Platform</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Solusi komprehensif untuk digitalisasi klinik modern. Tingkatkan efisiensi 
            dan kepuasan pasien dengan teknologi terkini.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow-primary group cursor-pointer h-full">
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
