import { motion } from "framer-motion";
import { Shield, Heart, Users, Award } from "lucide-react";

const AboutSection = () => {
  const values = [
    {
      icon: Heart,
      title: "Pelayanan Terbaik",
      description: "Kami berkomitmen memberikan pelayanan kesehatan terbaik dengan penuh empati dan profesionalisme"
    },
    {
      icon: Shield,
      title: "Terpercaya & Aman",
      description: "Data pasien dijamin keamanannya dengan sistem enkripsi dan standar keamanan tinggi"
    },
    {
      icon: Users,
      title: "Tim Profesional",
      description: "Dokter dan tenaga medis berpengalaman yang siap melayani dengan dedikasi tinggi"
    },
    {
      icon: Award,
      title: "Teknologi Modern",
      description: "Menggunakan sistem digital terkini untuk kemudahan dan efisiensi pelayanan"
    }
  ];

  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Tentang <span className="bg-gradient-primary bg-clip-text text-transparent">Klinik Sehat</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sistem manajemen klinik modern yang menghadirkan kemudahan dalam pelayanan kesehatan digital
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold mb-6">Visi Kami</h3>
            <p className="text-muted-foreground mb-4">
              Menjadi platform terdepan dalam transformasi digital layanan kesehatan di Indonesia, 
              memberikan akses mudah dan efisien bagi seluruh masyarakat.
            </p>
            <h3 className="text-3xl font-bold mb-6 mt-8">Misi Kami</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                Menyediakan sistem antrian digital yang efisien dan mudah digunakan
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                Meningkatkan kualitas pelayanan kesehatan melalui teknologi
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                Membangun ekosistem kesehatan digital yang terintegrasi
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card p-6 rounded-2xl border border-border hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold mb-2">{value.title}</h4>
                <p className="text-xs text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
        >
          {[
            { number: "2,500+", label: "Pasien Terlayani" },
            { number: "50+", label: "Dokter Profesional" },
            { number: "98%", label: "Kepuasan Pasien" },
            { number: "24/7", label: "Dukungan Online" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
