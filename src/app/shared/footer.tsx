  // src/shared/components/Footer.tsx
  export function Footer() {
    return (
      <footer className="bg-gray-900 text-gray-400 py-6 relative z-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          
          {/* Logo / Marca */}
          <div className="mb-4 md:mb-0">
            <span className="text-white font-bold text-lg">MinhaLogo</span>
          </div>

          {/* Links */}
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white">Política de Privacidade</a>
            <a href="#" className="hover:text-white">Termos de Uso</a>
            <a href="#" className="hover:text-white">Contato</a>
          </div>

          {/* Direitos reservados */}
          <div className="mt-4 md:mt-0 text-sm">
            © {new Date().getFullYear()} MinhaEmpresa. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    );
  }
