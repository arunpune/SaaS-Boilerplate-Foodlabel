import { Chatbot } from '@/components/Chatbot';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';

export default function UnauthLayout(props: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {props.children}
      <Footer />
      <Chatbot />
    </>
  );
}
