import { Header } from "./layout/Header";
import { NftGallery } from "./content/NftGallery";
import { Footer } from "./layout/Footer";

const JamonbreadWallet: React.FC = () => {
  return (
    <div className="container mx-auto p-6 max-w-6xl overflow-hidden">
      <Header />
      <NftGallery />
      <Footer />
    </div>
  );
};

export default JamonbreadWallet;
