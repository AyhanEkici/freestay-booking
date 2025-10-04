import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

// Mock authentication context
const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // Mock login
    setUser({ id: 1, email, role: 'customer' });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => React.useContext(AuthContext);

// Header Component
const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          Freestay
        </Link>
        
        <nav className="nav">
          <Link to="/">Home</Link>
          {user ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/vouchers">Vouchers</Link>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

// Home Page
const HomePage = () => {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date(Date.now() + 86400000));
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!location) return;
    
    const searchParams = new URLSearchParams({
      location,
      checkIn: checkIn.toISOString().split('T')[0],
      checkOut: checkOut.toISOString().split('T')[0],
      adults,
      children,
      rooms
    });
    
    navigate(`/search?${searchParams}`);
  };

  return (
    <div className="home-page">
      <div className="hero">
        <h1>Find Your Perfect Stay</h1>
        <p>Compare prices from hundreds of travel sites</p>
      </div>
      
      <form className="search-form" onSubmit={handleSearch}>
        <div className="search-field">
          <label>Destination</label>
          <input
            type="text"
            placeholder="Where are you going?"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        
        <div className="date-fields">
          <div className="date-field">
            <label>Check-in</label>
            <input
              type="date"
              value={checkIn.toISOString().split('T')[0]}
              onChange={(e) => setCheckIn(new Date(e.target.value))}
            />
          </div>
          <div className="date-field">
            <label>Check-out</label>
            <input
              type="date"
              value={checkOut.toISOString().split('T')[0]}
              onChange={(e) => setCheckOut(new Date(e.target.value))}
            />
          </div>
        </div>
        
        <div className="guest-fields">
          <label>Guests & Rooms</label>
          <select value={adults} onChange={(e) => setAdults(Number(e.target.value))}>
            {[1,2,3,4,5,6,7,8].map(num => (
              <option key={num} value={num}>{num} adult{num > 1 ? 's' : ''}</option>
            ))}
          </select>
          <select value={children} onChange={(e) => setChildren(Number(e.target.value))}>
            {[0,1,2,3,4,5].map(num => (
              <option key={num} value={num}>{num} child{num > 1 ? 'ren' : ''}</option>
            ))}
          </select>
          <select value={rooms} onChange={(e) => setRooms(Number(e.target.value))}>
            {[1,2,3,4,5].map(num => (
              <option key={num} value={num}>{num} room{num > 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>
        
        <button type="submit" className="search-button">
          Search Hotels
        </button>
      </form>
    </div>
  );
};

// Login Page
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    navigate('/dashboard');
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p><Link to="/register">Don't have an account? Register</Link></p>
      </div>
    </div>
  );
};

// Register Page
const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock registration
    login(email, password);
    navigate('/dashboard');
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
        </form>
        <p><Link to="/login">Already have an account? Login</Link></p>
      </div>
    </div>
  );
};

// Dashboard Page
const DashboardPage = () => {
  const { user } = useAuth();
  
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <p>Welcome, {user?.email}!</p>
      <div className="dashboard-links">
        <Link to="/vouchers">Manage Vouchers</Link>
        <Link to="/bookings">My Bookings</Link>
      </div>
    </div>
  );
};

// Vouchers Page
const VouchersPage = () => {
  return (
    <div className="vouchers-page">
      <h2>Voucher Management</h2>
      <p>Manage your vouchers here</p>
    </div>
  );
};

// Search Results Page
const SearchResultsPage = () => {
  const [searchParams] = window.location.search ? new URLSearchParams(window.location.search) : { get: () => null };
  
  const location = searchParams.get('location');
  const checkIn = searchParams.get('checkIn');
  const checkOut = searchParams.get('checkOut');
  
  // Mock hotel data
  const mockHotels = [
    {
      id: 1,
      name: "Grand Plaza Hotel",
      image: "https://via.placeholder.com/300x200",
      rating: 4.5,
      reviews: 1247,
      price: 120,
      oldPrice: 150,
      location: "Downtown, City Center",
      stars: 4,
      amenities: ["WiFi", "Pool", "Gym", "Spa"],
      description: "Luxury hotel with city views and premium amenities"
    },
    {
      id: 2,
      name: "Sunset Beach Resort",
      image: "https://via.placeholder.com/300x200",
      rating: 4.8,
      reviews: 892,
      price: 200,
      oldPrice: 250,
      location: "Beachfront, Ocean View",
      stars: 5,
      amenities: ["WiFi", "Beach", "Pool", "Restaurant"],
      description: "Perfect beach getaway with stunning ocean views"
    }
  ];

  return (
    <div className="search-results">
      <div className="search-summary">
        <h2>Hotels in {location}</h2>
        <p>{checkIn} to {checkOut}</p>
      </div>
      
      <div className="hotels-list">
        {mockHotels.map(hotel => (
          <div key={hotel.id} className="hotel-card">
            <img src={hotel.image} alt={hotel.name} />
            <div className="hotel-info">
              <h3>{hotel.name}</h3>
              <p className="location">{hotel.location}</p>
              <div className="rating">
                {'★'.repeat(hotel.stars)}
                {'☆'.repeat(5 - hotel.stars)}
                <span>{hotel.rating}</span>
              </div>
              <p className="description">{hotel.description}</p>
              <div className="amenities">
                {hotel.amenities.map((amenity, index) => (
                  <span key={index} className="amenity-tag">{amenity}</span>
                ))}
              </div>
              <div className="price-section">
                <span className="current-price">€{hotel.price}</span>
                <span className="old-price">€{hotel.oldPrice}</span>
                <button className="book-btn">Book Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/vouchers" element={<VouchersPage />} />
              <Route path="/search" element={<SearchResultsPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
