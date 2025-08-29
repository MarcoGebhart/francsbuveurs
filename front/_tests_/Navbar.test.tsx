import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { NavBar } from '../src/app/components/NavBar';

// Mock du logo pour éviter les erreurs de chargement d'image
jest.mock('../public/logo.png', () => 'logo.png');

describe('Navbar (menu burger)', () => {
  test('le menu burger est visible sur un petit écran', () => {
    // Rend le composant
    render(<NavBar />);
    
    // Le bouton du menu burger doit être visible dans le code car jsdom ne prend pas en charge les propriètés CSS de tailwind.
    expect(screen.getByRole('button', { name: /menu mobile/i })).toBeInTheDocument();
  });

  test('le menu s’ouvre et se ferme au clic', () => {
    // Rend le composant
    render(<NavBar />);
    
    // Le menu mobile est caché par défaut
    expect(screen.queryByText(/LA BOUTIQUE/i, { selector: '.md\\:hidden a' })).not.toBeInTheDocument();
    
    // Trouve le bouton du menu
    const btn = screen.getByRole('button', { name: /menu mobile/i });
    
    // Simule un clic pour ouvrir le menu
    fireEvent.click(btn);
    
    // Le lien de la boutique devrait maintenant être visible
    expect(screen.getByText(/LA BOUTIQUE/i, { selector: '.md\\:hidden a' })).toBeInTheDocument();
    
    // Simule un clic sur un lien pour fermer le menu
    fireEvent.click(screen.getByText(/LA BOUTIQUE/i, { selector: '.md\\:hidden a' }));
    
    // Le lien de la boutique devrait être à nouveau caché
    expect(screen.queryByText(/LA BOUTIQUE/i, { selector: '.md\\:hidden a' })).not.toBeInTheDocument();
  });
});