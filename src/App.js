import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Header from './presentation/components/Header';
import Footer from './presentation/components/Footer';
import Home from './presentation/pages/Home';
import './presentation/styles/global-scroll-fix.css';
import './presentation/styles/modal-system.css';

// Lazy load components for better performance
const About = lazy(() => import('./presentation/pages/About'));
const Confess = lazy(() => import('./presentation/pages/Confess'));
const Check = lazy(() => import('./presentation/pages/Check'));
const CheckInput = lazy(() => import('./presentation/pages/CheckInput'));
const Message = lazy(() => import('./presentation/pages/Message'));
const SignUp = lazy(() => import('./presentation/pages/SignUp'));
const SignIn = lazy(() => import('./presentation/pages/SignIn'));
const ForgotPassword = lazy(() => import('./presentation/pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./presentation/pages/ResetPassword'));
const Settings = lazy(() => import('./presentation/pages/Settings'));
const Terms = lazy(() => import('./presentation/pages/Terms'));
const Privacy = lazy(() => import('./presentation/pages/Privacy'));
const Payment = lazy(() => import('./presentation/pages/Payment'));
const PaymentSuccess = lazy(() => import('./presentation/pages/PaymentSuccess'));
const PaymentFail = lazy(() => import('./presentation/pages/PaymentFail'));
const LetterDelivery = lazy(() => import('./presentation/pages/LetterDelivery'));
const Contact = lazy(() => import('./presentation/pages/Contact'));
const HowItWorks = lazy(() => import('./presentation/pages/HowItWorks'));

// Loading component for lazy routes
const LoadingSpinner = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px',
    color: 'white'
  }}>
    <div style={{
      width: '40px',
      height: '40px',
      border: '4px solid rgba(139, 92, 246, 0.3)',
      borderTop: '4px solid #8B5CF6',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }}></div>
  </div>
);

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main style={{ flex: 1 }}>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/confess" element={<Confess />} />
              <Route path="/check" element={<CheckInput />} />
              <Route path="/check/:id" element={<Check />} />
              <Route path="/message/:id" element={<Message />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/payment/success" element={<PaymentSuccess />} />
              <Route path="/payment/fail" element={<PaymentFail />} />
              <Route path="/letter-delivery" element={<LetterDelivery />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;