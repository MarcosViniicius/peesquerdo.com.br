import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  AlertTriangle,
  ArrowRight,
  Flag,
  Footprints,
  MessageSquareWarning,
  ShoppingCart,
  Skull,
  Trash2,
  Zap,
} from 'lucide-react';

type View = 'home' | 'catalog' | 'cart' | 'checkout' | 'success';

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  desc: string;
  rating: number;
  isHot?: boolean;
  badge?: string;
};

type SatireItem = {
  name: string;
  desc: string;
  image: string;
};

type CartItem = Product & { cartId: number };

const siteUrl = 'https://peesquerdo.com.br';

const catalog: Product[] = [
  {
    id: 1,
    name: "Havaiana 'Ameaça à Soberania'",
    price: 99.9,
    image:
      'https://images.unsplash.com/photo-1603487759033-bf99712a84a2?auto=format&fit=crop&q=80&w=400',
    desc: 'Sandália que faz deputados perderem o sono. Edição "Cancelada pela Direita".',
    rating: 5.0,
    isHot: true,
    badge: 'Pauta do dia',
  },
  {
    id: 2,
    name: 'Kit Sobrevivência ao Boicote',
    price: 22.0,
    image:
      'https://images.unsplash.com/photo-1549032305-e816fabf3dd3?auto=format&fit=crop&q=80&w=400',
    desc: "Contém 1 pé esquerdo e um adesivo 'Não me boicote, sou apenas borracha'.",
    rating: 4.7,
    badge: 'Best meme',
  },
  {
    id: 3,
    name: "Alpargata 'Fernanda Sem Filtro'",
    price: 131.0,
    image:
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=400',
    desc: 'Aprovada por quem não aguenta mais mimimi parlamentar. Só o pé esquerdo disponível.',
    rating: 4.9,
    badge: 'Oscar ready',
  },
  {
    id: 4,
    name: "Meia 'Anti-Zambelli'",
    price: 19.9,
    image:
      'https://images.unsplash.com/photo-1582966239102-13cc3074129b?auto=format&fit=crop&q=80&w=400',
    desc: 'Tecnologia anti-perseguição em calçadas de Madrid e Brasília.',
    rating: 4.2,
    badge: 'Foge, Carol',
  },
  {
    id: 5,
    name: "Chinelo de Ouro 'Lei Rouanet'",
    price: 8400.0,
    image:
      'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&q=80&w=400',
    desc: 'Pago inteiramente com a imaginação da oposição. Puro luxo sinistro.',
    rating: 5.0,
    isHot: true,
    badge: 'Patrocínio imaginário',
  },
  {
    id: 6,
    name: "Óleo de Peroba 'Pele de Político'",
    price: 33.33,
    image:
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=400',
    desc: 'Para passar na cara de quem se ofende com comercial de sandália.',
    rating: 4.5,
    badge: 'Uso diário',
  },
];

const categories = [
  {
    title: 'Sandálias ideológicas',
    blurb: 'Modelos que mudam de cor conforme o espectro político ou quando sente cheiro de panela queimada.',
    pills: ['Centro que não existe', 'Esquerda de borracha', 'Direita de espuma'],
  },
  {
    title: 'Textos dramáticos da Fernanda Torres',
    blurb: 'Assine para receber monólogos semanais narrados como se fossem dublagens de Oscar.',
    pills: ['Plano anual com plot twist', 'Streaming de crônicas', 'Spoiler: ninguém aprende nada'],
  },
  {
    title: 'Pacotes de indignação',
    blurb: 'Assinatura mensal para reclamar com eloquência em redes sociais e grupos de família.',
    pills: ['Reclame 24/7', 'Sticker de textão', 'Upgrade para áudio de 12 min'],
  },
];

const featuredProduct: Product = {
  id: 99,
  name: 'Havaianas Revolucionárias – cada passo é um manifesto',
  price: 177.76,
  image: 'https://images.unsplash.com/photo-1528701800489-20be9e8dd2a1?auto=format&fit=crop&q=80&w=900',
  desc: 'Vem com chip que muda a cor da tira conforme a opinião do grupo do zap. Causa debates na fila do pão.',
  rating: 5,
  isHot: true,
  badge: 'Nova coleção do caos',
};

const fakeReviews = [
  'Comprei e virei comunista em 3 dias, mas continuei pagando boleto — incoerência deliciosa.',
  'Usei e agora só falo em meritocracia; o chinelo ajusta minha opinião conforme o sol.',
  'Pisei e apareceu um coach de direita na calçada. Dei block com o pé esquerdo.',
  'Assinei os textos da Fernanda e agora narro o cafezinho como se fosse o Dom Casmurro.',
];
const satireImages = [
  'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1542293779-0889e4aca7a2?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1528701800489-20be9e8dd2a1?auto=format&fit=crop&q=80&w=800',
];

const baseSatiricalCatalog = [
  { name: 'Camiseta Revolução Gourmet', desc: 'Para quem luta contra o capitalismo, mas só com café orgânico na mão.' },
  { name: 'Caneca Livre Mercado', desc: 'Ideal para beber água privatizada com gosto de lucro.' },
  { name: 'Boné Socialismo Fashion', desc: 'Porque até a revolução precisa de estilo.' },
  { name: 'Agenda Meritocracia', desc: 'Anote seus privilégios como se fossem conquistas pessoais.' },
  { name: 'Mochila Identitária', desc: 'Cabe todas as bandeiras possíveis, menos a do consenso.' },
  { name: 'Perfume Capitalismo Selvagem', desc: 'Aroma de exploração com notas de desigualdade.' },
  { name: 'Sandália Proletária', desc: 'Conforto para marchar até o próximo protesto.' },
  { name: 'Relógio Liberal', desc: 'Marca horas, mas não regula nada.' },
  { name: 'Óculos Progressistas', desc: 'Veja o mundo com lentes cor-de-rosa e hashtags.' },
  { name: 'Gravata Conservadora', desc: 'Aperta o pescoço, mas mantém a tradição.' },
  { name: 'Smartphone Revolucionário', desc: 'Posta textão no Twitter, mas foi feito na China.' },
  { name: 'Carteira Neoliberal', desc: 'Sempre vazia, mas com promessa de prosperidade.' },
  { name: 'Chapéu Marxista', desc: 'Protege do sol e da alienação.' },
  { name: 'Pulseira Patriota', desc: 'Brilha mais que o hino nacional em karaokê.' },
  { name: 'Caderno Coletivista', desc: 'Compartilhe ideias, mas não as páginas.' },
  { name: 'Mouse Libertário', desc: 'Funciona sem fio, sem Estado e sem garantia.' },
  { name: 'Almofada Sindical', desc: 'Conforto para greves longas.' },
  { name: 'Guarda-chuva Conservador', desc: 'Abre devagar, porque mudança assusta.' },
  { name: 'Copo Identitário', desc: 'Cada gole representa uma causa diferente.' },
  { name: 'Camiseta Livre-Arbítrio', desc: 'Estampa que você escolheu, mas foi feita por algoritmos.' },
  { name: 'Bolsa Feminista', desc: 'Cabe tudo, menos o patriarcado.' },
  { name: 'Chaveiro Militarista', desc: 'Abre portas e fecha diálogos.' },
  { name: 'Colar Ambientalista', desc: 'Feito de plástico reciclado que ainda polui.' },
  { name: 'Tênis Liberal', desc: 'Corre rápido, mas só para quem pode pagar.' },
  { name: 'Livro Revolução Delivery', desc: 'Chega em casa em 24h, sem precisar sair às ruas.' },
  { name: 'Bandeira Nacionalista', desc: 'Tremula mais forte quando há inimigos imaginários.' },
  { name: 'Caneta Social Democrata', desc: 'Escreve devagar, mas tenta agradar a todos.' },
  { name: 'Camiseta Anti-impostos', desc: 'Produzida com subsídio estatal.' },
  { name: 'Copo Vegan Revoltado', desc: 'Sem leite, sem carne, mas cheio de julgamento.' },
  { name: 'Boné Tradicionalista', desc: 'Protege do sol e das ideias novas.' },
  { name: 'Agenda Revolta Online', desc: 'Planeje protestos sem sair do sofá.' },
  { name: 'Camiseta Livre Mercado', desc: 'Estampa “menos Estado”, mas foi vendida com imposto.' },
  { name: 'Mochila Patriótica', desc: 'Cabe orgulho nacional e desinformação.' },
  { name: 'Relógio Revolucionário', desc: 'Marca a hora da revolta, mas nunca chega.' },
  { name: 'Camiseta “Sou Contra Tudo”', desc: 'Ideal para quem protesta sem saber por quê.' },
  { name: 'Caneca “Imposto é Roubo”', desc: 'Produzida com incentivo fiscal.' },
  { name: 'Chapéu “Cancelamento”', desc: 'Protege da chuva e das opiniões divergentes.' },
  { name: 'Camiseta “Sou de Centro”', desc: 'Tão neutra que ninguém nota.' },
  { name: 'Almofada “Textão”', desc: 'Conforto para escrever 10 páginas no Facebook.' },
  { name: 'Camiseta “Sou Patriota”', desc: 'Estampa bandeira, mas foi costurada no exterior.' },
  { name: 'Camiseta “Sou Revolucionário”', desc: 'Só usada em festas universitárias.' },
  { name: 'Camiseta “Sou Liberal”', desc: 'Vem com manual de autoajuda.' },
  { name: 'Camiseta “Sou Conservador”', desc: 'Lavagem apenas com água benta.' },
  { name: 'Camiseta “Sou Progressista”', desc: 'Estampa arco-íris, mas não inclui diversidade real.' },
  { name: 'Camiseta “Sou Anarquista”', desc: 'Não tem etiqueta, nem preço.' },
  { name: 'Camiseta “Sou Comunista”', desc: 'Produzida em massa, mas vendida individualmente.' },
  { name: 'Camiseta “Sou Capitalista”', desc: 'Estampa cifrão, mas custa caro demais.' },
  { name: 'Camiseta “Sou Socialista”', desc: 'Compartilha tecido com todos os outros modelos.' },
  { name: 'Camiseta “Sou Libertário”', desc: 'Não aceita regras, nem costura.' },
  { name: 'Camiseta “Sou Globalista”', desc: 'Estampa mapa-múndi, mas ignora fronteiras reais.' },
];

const satiricalCatalog: SatireItem[] = baseSatiricalCatalog.map((item, index) => ({
  ...item,
  image: satireImages[index % satireImages.length],
}));

const paymentOptions = [
  'Pix do Centrão',
  'Cartão de crédito do Banco Socialista',
  'Vale-refeição neoliberal',
  'Boleto com juros do Mercado Livre de Opiniões',
];

const miniBanners = [
  'Combo: leve 2 opiniões, pague 1 e ganhe um unfollow cortesia.',
  'Cashback em tretas: cada compra rende 3 threads no Twitter/X.',
  'Entrega express de polêmica: chega antes do café esfriar.',
];

const App = () => {
  const [view, setView] = useState<View>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const [indignationLevel, setIndignationLevel] = useState(0);
  const [showPromoPopup, setShowPromoPopup] = useState(false);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIndignationLevel((prev) => prev + Math.floor(Math.random() * 50));
    }, 2200);

    const popup = window.setTimeout(() => setShowPromoPopup(true), 1400);
    return () => {
      window.clearInterval(interval);
      window.clearTimeout(popup);
    };
  }, []);

  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, { ...product, cartId: Date.now() + Math.floor(Math.random() * 1000) }]);
    setShowNotification(true);
    window.setTimeout(() => setShowNotification(false), 2500);
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.cartId !== id));
  };

  const cartTotal = useMemo(() => cart.reduce((acc, curr) => acc + curr.price, 0), [cart]);

  const Navbar = () => (
    <nav className="sticky top-0 z-50 bg-black text-white p-4 flex justify-between items-center px-6 border-b-4 border-red-600">
      <button
        type="button"
        className="flex items-center gap-2 cursor-pointer group"
        onClick={() => setView('home')}
      >
        <Footprints className="text-red-600 group-hover:rotate-180 transition-transform duration-700" size={32} />
        <span className="font-black text-2xl tracking-tighter uppercase italic">
          PÉESQUERDO
          <span className="text-red-600">.COM.BR</span>
        </span>
      </button>
      <div className="hidden md:flex items-center gap-4 text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
        <button
          type="button"
          onClick={() => setView('catalog')}
          className="underline underline-offset-4 decoration-red-600 decoration-2 hover:text-white"
        >
          Produtos
        </button>
        <span>
          Monitor de Indignação: <span className="text-red-600">{indignationLevel} Hectares de Print</span>
        </span>
      </div>
      <div className="flex gap-4 items-center">
        <button
          type="button"
          onClick={() => setView('cart')}
          className="relative p-2 bg-red-600 text-white rounded-none hover:bg-white hover:text-black transition-all"
        >
          <ShoppingCart size={24} />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-bold px-2 py-0.5">
              {cart.length}
            </span>
          )}
        </button>
      </div>
    </nav>
  );

  const CategoryBadges = () => (
    <div className="max-w-7xl mx-auto px-6 mt-16 grid gap-6 md:grid-cols-3">
      {categories.map((cat) => (
        <div
          key={cat.title}
          className="bg-neutral-900 border border-neutral-800 hover:border-red-600 transition-colors p-6 flex flex-col gap-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-500 font-bold">Categoria</span>
            <span className="bg-red-600 text-black px-2 py-1 text-[10px] font-black uppercase">Trending</span>
          </div>
          <h3 className="text-2xl font-black uppercase italic leading-tight">{cat.title}</h3>
          <p className="text-sm text-neutral-400 leading-relaxed">{cat.blurb}</p>
          <div className="flex flex-wrap gap-2">
            {cat.pills.map((pill) => (
              <span key={pill} className="bg-neutral-800 text-neutral-300 px-3 py-1 text-[11px] uppercase tracking-widest">
                {pill}
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setView('cart')}
            className="mt-auto bg-red-600 text-white font-black uppercase px-4 py-3 hover:bg-white hover:text-black transition-all"
          >
            Navegar tretas
          </button>
        </div>
      ))}
    </div>
  );

  const ProductGrid = () => (
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
      {catalog.map((product) => (
        <div
          key={product.id}
          className="group bg-neutral-900 border border-neutral-800 hover:border-red-600 transition-all p-5 relative overflow-hidden"
        >
          {product.isHot && (
            <div className="absolute -right-10 top-5 bg-red-600 text-white px-10 py-1 rotate-45 text-[10px] font-black uppercase shadow-lg">
              Mais Odiado
            </div>
          )}
          {product.badge && (
            <span className="absolute left-4 top-4 bg-white text-black px-3 py-1 text-[10px] font-black uppercase shadow-lg">
              {product.badge}
            </span>
          )}
          <div className="relative overflow-hidden aspect-video mb-6">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
            />
            <div className="absolute inset-0 bg-red-600/10 group-hover:bg-transparent transition-colors" />
          </div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-black text-xl uppercase italic leading-none">{product.name}</h3>
            <span className="text-xs text-neutral-500">{product.rating.toFixed(1)}★</span>
          </div>
          <p className="text-neutral-500 text-sm mb-6 h-12 leading-snug">{product.desc}</p>
          <div className="flex items-center justify-between border-t border-neutral-800 pt-4">
            <div>
              <span className="block text-[10px] text-neutral-600 font-bold uppercase tracking-widest italic">
                Preço em moedas vermelhas
              </span>
              <span className="text-2xl font-black">
                R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <button
              type="button"
              onClick={() => addToCart(product)}
              className="bg-red-600 text-white p-4 hover:scale-110 active:scale-95 transition-all"
            >
              <Zap size={20} fill="currentColor" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const FeaturedProduct = () => (
    <div className="max-w-6xl mx-auto px-6 mt-20 grid md:grid-cols-2 gap-10 items-center border border-neutral-800 bg-neutral-900">
      <div className="relative overflow-hidden">
        <img
          src={featuredProduct.image}
          alt={featuredProduct.name}
          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all"
        />
        <span className="absolute top-6 left-6 bg-white text-black px-3 py-1 text-[10px] font-black uppercase">
          {featuredProduct.badge}
        </span>
      </div>
      <div className="p-6 space-y-4">
        <div className="inline-flex items-center gap-2 bg-red-600 text-black px-3 py-1 text-[11px] font-black uppercase">
          Promoção da Polêmica – leve 2 opiniões, pague 1
        </div>
        <h2 className="text-4xl font-black uppercase italic leading-tight">{featuredProduct.name}</h2>
        <p className="text-neutral-300 leading-relaxed">{featuredProduct.desc}</p>
        <ul className="text-sm text-neutral-400 space-y-2">
          <li>• Muda a cor conforme o espectro político do ambiente.</li>
          <li>• Cada passo gera um textão automático para postar.</li>
          <li>• Inclui cupom "FERNANDAFALA" que adiciona drama na caminhada.</li>
        </ul>
        <div className="flex items-center gap-4">
          <span className="text-3xl font-black text-red-500">
            R$ {featuredProduct.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
          <span className="text-sm uppercase text-neutral-500">5,0★ aprovado por haters e fãs</span>
        </div>
        <div className="flex gap-3 flex-wrap">
          <button
            type="button"
            onClick={() => addToCart(featuredProduct)}
            className="bg-red-600 text-white font-black uppercase px-6 py-4 hover:bg-white hover:text-black transition-all"
          >
            Colocar no carrinho
          </button>
          <button
            type="button"
            onClick={() => setView('cart')}
            className="border border-neutral-700 text-neutral-300 px-6 py-4 uppercase font-bold hover:border-white"
          >
            Ver carrinho polarizado
          </button>
        </div>
      </div>
    </div>
  );

  const Reviews = () => (
    <div className="max-w-6xl mx-auto px-6 mt-16">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-red-600 text-black px-3 py-1 text-[11px] font-black uppercase">Avaliações improvisadas</div>
        <span className="text-neutral-500 text-xs uppercase tracking-[0.2em]">Nota média 4,9★</span>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {fakeReviews.map((review) => (
          <div key={review} className="bg-neutral-900 border border-neutral-800 p-5">
            <p className="text-sm text-neutral-200 leading-relaxed">{review}</p>
            <div className="flex items-center justify-between mt-4 text-[11px] uppercase text-neutral-500">
              <span>Comprador verificado pela treta</span>
              <span className="text-red-500 font-black">5★</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const CatalogView = () => (
    <>
      <Helmet>
        <title>Catálogo · PÉESQUERDO.COM.BR</title>
        <meta name="description" content="Catálogo irônico com 50 itens equilibrando tretas à esquerda e à direita." />
        <link rel="canonical" href={`${siteUrl}/catalog`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Catálogo · PÉESQUERDO.COM.BR" />
        <meta property="og:url" content={`${siteUrl}/catalog`} />
      </Helmet>

      <div className="min-h-screen bg-neutral-950 text-white p-6 md:p-12">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
          <div>
            <h2 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter">Produtos</h2>
            <p className="text-neutral-500 uppercase text-xs tracking-[0.3em] mt-2">
              Catálogo irônico com 50 itens equilibrando tretas à esquerda e à direita.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setView('cart')}
            className="bg-red-600 text-white px-6 py-3 font-black uppercase hover:bg-white hover:text-black transition-all"
          >
            Ver carrinho polarizado
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {satiricalCatalog.map((item) => (
            <div
              key={item.name}
              className="bg-neutral-900 border border-neutral-800 p-5 h-full flex flex-col gap-3 hover:border-red-600 transition-colors"
            >
              <div className="relative overflow-hidden aspect-video border border-neutral-800">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <span className="absolute bottom-2 left-2 bg-red-600 text-black px-2 py-1 text-[10px] font-black uppercase">Produto</span>
              </div>
              <h3 className="font-black text-xl uppercase leading-tight">{item.name}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed flex-1">{item.desc}</p>
              <div className="text-[11px] uppercase text-red-400 tracking-[0.25em]">Entrega de tretas inclusa</div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-3 text-[11px] uppercase text-neutral-500">
          <span className="bg-neutral-900 border border-neutral-800 px-3 py-2">Entrega de tretas imediata no Twitter</span>
          <span className="bg-neutral-900 border border-neutral-800 px-3 py-2">Equilíbrio de ironias: ninguém sai ileso</span>
          <span className="bg-neutral-900 border border-neutral-800 px-3 py-2">Leia com moderação emocional</span>
        </div>
      </div>
    </>
  );

  const MiniBanners = () => (
    <div className="max-w-7xl mx-auto px-6 mt-16 grid md:grid-cols-3 gap-4">
      {miniBanners.map((text) => (
        <div key={text} className="bg-gradient-to-br from-red-700 to-black text-white p-6 border border-red-900">
          <p className="font-black uppercase text-lg leading-tight">{text}</p>
          <p className="text-[11px] text-red-200 mt-2 uppercase">Oferta relâmpago de desavença</p>
        </div>
      ))}
    </div>
  );

  const Hero = () => (
    <section className="relative py-16 md:py-24 flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
      <div className="z-10 max-w-5xl">
        <div className="inline-block bg-white text-black px-3 py-1 mb-4 font-black text-sm uppercase skew-x-[-10deg]">
          Promoção da Polêmica – leve 2 opiniões, pague 1
        </div>
        <h1 className="text-5xl md:text-8xl font-black mb-4 leading-none tracking-tighter">
          CALCE O <span className="text-red-600 italic">SUBVERSIVO</span>.
        </h1>
        <h2 className="text-3xl md:text-4xl font-black text-neutral-400 mb-6 uppercase tracking-tight">
          Marketplace que entrega tretas em 24h úteis de feed
        </h2>
        <p className="text-lg md:text-xl text-neutral-400 max-w-3xl mx-auto mb-10 font-medium leading-relaxed">
          Se um comercial de sandália derruba governos imaginários, imagine o que uma coleção inteira faz com o seu grupo de família.
          Aqui vendemos apenas o pé esquerdo — o direito é optional DLC.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            type="button"
            onClick={() => setView('catalog')}
            className="bg-red-600 text-white font-black px-10 py-5 text-xl hover:bg-white hover:text-black transition-all border-2 border-red-600"
          >
            Adquirir o perigo
          </button>
          <button
            type="button"
            onClick={() => setView('catalog')}
            className="bg-transparent border-2 border-neutral-800 text-neutral-500 font-black px-10 py-5 text-xl hover:border-white hover:text-white transition-all"
          >
            Denunciar no WhatsApp
          </button>
        </div>
      </div>
    </section>
  );

  const HomeView = () => {
    const productLd = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: featuredProduct.name,
      image: [featuredProduct.image],
      description: featuredProduct.desc,
      sku: `feat-${featuredProduct.id}`,
      brand: { '@type': 'Brand', name: 'PÉESQUERDO' },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'BRL',
        price: featuredProduct.price.toFixed(2),
        availability: 'https://schema.org/InStock',
        url: `${siteUrl}/#featured`,
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: featuredProduct.rating.toFixed(1),
        reviewCount: 420,
      },
    };

    return (
      <>
        <Helmet>
          <title>PÉESQUERDO.COM.BR · Marketplace sátira da polêmica</title>
          <meta
            name="description"
            content="Marketplace paródia inspirado na polêmica Fernanda Torres x Havaianas. Produtos fictícios, ironia real."
          />
          <meta name="keywords" content="paródia, sátira, havaianas, fernanda torres, polêmica, marketplace, humor político" />
          <link rel="canonical" href={`${siteUrl}/`} />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="PÉESQUERDO.COM.BR · Marketplace sátira" />
          <meta
            property="og:description"
            content="Produtos fictícios, ironia real. Polêmica Fernanda Torres x Havaianas reimaginada em ecommerce."
          />
          <meta property="og:url" content={`${siteUrl}/`} />
          <meta
            property="og:image"
            content="https://images.unsplash.com/photo-1603487759033-bf99712a84a2?auto=format&fit=crop&q=80&w=1200"
          />
          <script type="application/ld+json">{JSON.stringify(productLd)}</script>
        </Helmet>

        <div className="min-h-screen bg-neutral-950 text-white pb-24">
          <div className="bg-red-600 text-black py-2 px-4 flex items-center justify-center gap-4 text-xs font-black animate-pulse">
            <AlertTriangle size={16} /> ALERTA: SANDÁLIAS IDEOLÓGICAS DETECTADAS NA ÁREA! <AlertTriangle size={16} />
          </div>

          <Hero />
          <MiniBanners />
          <CategoryBadges />
          <FeaturedProduct />
          <ProductGrid />

          <div className="mt-24 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center border-y border-neutral-800 py-20">
            <div>
              <h2 className="text-4xl font-black mb-6 uppercase italic">
                "Minha família está em risco por causa de um solado de borracha."
              </h2>
              <p className="text-neutral-400 mb-8 italic">— Deputado médio que nunca lavou o próprio chinelo.</p>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="bg-red-600 p-2">
                    <Skull size={20} />
                  </div>
                  <p className="text-sm font-bold uppercase">100% Sinistro: sandálias que não respeitam a hierarquia do pé direito.</p>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-white p-2 text-black">
                    <Flag size={20} />
                  </div>
                  <p className="text-sm font-bold uppercase">Patriotismo de prateleira: para quem prefere boicotar do que trabalhar.</p>
                </div>
              </div>
            </div>
            <div className="bg-red-600 p-10 rotate-2">
              <h3 className="text-black text-6xl font-black tracking-tighter uppercase mb-4">AVISO!</h3>
              <p className="text-black font-bold text-lg leading-tight uppercase">
                Calçar o pé esquerdo pode causar: <br />• Empatia súbita <br />• Desejo de ir ao Oscar <br />• Perda de tempo em grupos de Telegram
              </p>
            </div>
          </div>

          <Reviews />

          <div className="max-w-6xl mx-auto px-6 mt-20 mb-10 bg-neutral-900 border border-neutral-800 p-8">
            <div className="inline-flex items-center gap-2 bg-red-600 text-black px-3 py-1 text-[11px] font-black uppercase mb-4">
              Sobre
            </div>
            <h3 className="text-3xl font-black uppercase italic mb-3">Site de comédia, não de venda</h3>
            <p className="text-neutral-300 leading-relaxed text-sm md:text-base">
              Este marketplace é uma sátira. Nenhum produto é real, nenhuma compra será concluída. A intenção é brincar com a
              polarização e com a polêmica Fernanda Torres x Havaianas, misturando referências e ironias. Se algo chegar em
              casa, é só mais uma treta no grupo da família.
            </p>
          </div>
        </div>
      </>
    );
  };

  const CartView = () => (
    <>
      <Helmet>
        <title>Carrinho · PÉESQUERDO.COM.BR</title>
        <meta name="description" content="Seu carrinho está mais polarizado que o Congresso — finalize antes que viem CPI." />
        <link rel="canonical" href={`${siteUrl}/cart`} />
      </Helmet>

      <div className="min-h-screen bg-neutral-950 text-white p-6 md:p-12">
        <h2 className="text-6xl font-black mb-2 uppercase italic tracking-tighter">
          CARRINHO <span className="text-red-600">IDEOLÓGICO</span>
        </h2>
        <p className="text-neutral-500 mb-10 uppercase text-xs tracking-[0.3em]">
          Seu carrinho está mais polarizado que o Congresso — finalize antes que viem CPI.
        </p>
        {cart.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-neutral-800">
            <MessageSquareWarning className="mx-auto mb-4 text-neutral-700" size={60} />
            <p className="text-2xl text-neutral-500 mb-6 font-black uppercase">
              Seu carrinho está limpo de qualquer influência esquerdista.
            </p>
            <button
              type="button"
              onClick={() => setView('home')}
              className="bg-red-600 text-white px-8 py-3 font-bold uppercase"
            >
              Ir se corromper
            </button>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-4">
            {cart.map((item) => (
              <div
                key={item.cartId}
                className="flex items-center bg-neutral-900 p-6 border-l-8 border-red-600 hover:bg-neutral-800 transition-colors"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover mr-6 border-2 border-white"
                />
                <div className="flex-1">
                  <h4 className="font-black text-xl uppercase italic">{item.name}</h4>
                  <p className="text-red-600 font-black text-lg uppercase tracking-widest">R$ {item.price.toFixed(2)}</p>
                  <p className="text-[11px] text-neutral-500 uppercase tracking-[0.2em]">Incluso: adesivo "me cancela" gratis</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeFromCart(item.cartId)}
                  className="text-neutral-500 hover:text-red-600 transition-colors"
                  aria-label={`Remover ${item.name} do carrinho`}
                >
                  <Trash2 size={24} />
                </button>
              </div>
            ))}
            <div className="mt-12 p-10 border-4 border-white">
              <div className="flex justify-between text-4xl font-black mb-6">
                <span className="italic uppercase">TOTAL DO DÉBITO</span>
                <span className="text-red-600">R$ {cartTotal.toFixed(2)}</span>
              </div>
              <p className="text-sm text-neutral-500 mb-6 uppercase tracking-[0.2em]">
                Pagamento dividido em 12 textões sem juros emocionais.
              </p>
              <button
                type="button"
                onClick={() => setView('checkout')}
                className="w-full bg-red-600 text-white py-6 font-black text-3xl hover:bg-white hover:text-black transition-all uppercase italic"
              >
                Confirmar Autoflagelação
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );

  const CheckoutView = () => (
    <>
      <Helmet>
        <title>Checkout · PÉESQUERDO.COM.BR</title>
        <meta name="description" content="Finalize o textão com dados mínimos de bom senso." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href={`${siteUrl}/checkout`} />
      </Helmet>

      <div className="min-h-screen bg-neutral-950 text-white p-6 md:p-12">
        <div className="max-w-3xl mx-auto bg-neutral-900 border-4 border-red-600 p-10">
          <h2 className="text-4xl font-black mb-2 italic uppercase text-red-600">Formulário de Indignação</h2>
          <p className="text-sm uppercase text-neutral-500 mb-8">Finalize o textão com dados mínimos de bom senso</p>
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-neutral-500 mb-2 uppercase tracking-[0.2em]">
                Seu Perfil Político
              </label>
              <select className="w-full bg-black border border-neutral-700 p-4 outline-none focus:border-red-600 text-sm font-bold">
                <option>Patriota mas com calo no pé direito</option>
                <option>Fã da Fernanda Torres (Infiltrado)</option>
                <option>Só vim pelo boicote</option>
                <option>Fisicamente Destro, Mentalmente Sinistro</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-black text-neutral-500 mb-2 uppercase tracking-[0.2em]">
                Endereço para os Agentes do Boicote ignorarem
              </label>
              <input
                type="text"
                className="w-full bg-black border border-neutral-700 p-4 outline-none focus:border-red-600"
                placeholder="Rua do Protesto, 171"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-black text-neutral-500 mb-2 uppercase tracking-[0.2em]">
                  Cartão 'Corporativo'
                </label>
                <input
                  type="text"
                  className="w-full bg-black border border-neutral-700 p-4 outline-none focus:border-red-600"
                  placeholder="**** **** **** ****"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-neutral-500 mb-2 uppercase tracking-[0.2em]">
                  Senha do Pix de 22 reais
                </label>
                <input
                  type="password"
                  className="w-full bg-black border border-neutral-700 p-4 outline-none focus:border-red-600"
                  placeholder="******"
                />
              </div>
            </div>

            <div className="bg-neutral-800 p-4 border border-neutral-700">
              <p className="text-[11px] uppercase text-neutral-400 mb-3 tracking-[0.2em]">Opções de pagamento</p>
              <div className="grid md:grid-cols-2 gap-3">
                {paymentOptions.map((opt) => (
                  <label key={opt} className="flex items-center gap-3 bg-black/40 border border-neutral-700 px-3 py-3 cursor-pointer hover:border-red-600">
                    <input type="radio" name="payment" className="accent-red-600" />
                    <span className="text-sm font-bold text-neutral-200">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={() => setView('success')}
                className="w-full bg-white text-black py-6 font-black text-2xl hover:bg-red-600 hover:text-white transition-all uppercase"
              >
                Finalizar Atentado à Moral <ArrowRight size={24} className="inline ml-2" />
              </button>
              <p className="text-[9px] text-neutral-700 mt-6 text-center leading-tight uppercase font-bold">
                Nota: Ao clicar, você assume que não sabe diferenciar um par de chinelos de um golpe de estado. A PÉESQUERDO.COM.BR não se responsabiliza por vizinhos batendo panela.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const SuccessView = () => (
    <>
      <Helmet>
        <title>Pedido Cancelado · PÉESQUERDO.COM.BR</title>
        <meta name="description" content="O boicote venceu: nada será entregue, apenas tretas." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href={`${siteUrl}/success`} />
      </Helmet>

      <div className="min-h-screen bg-red-600 flex items-center justify-center p-6 text-black">
        <div className="max-w-4xl w-full bg-white p-16 text-center shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] relative">
          <div className="absolute top-4 left-4 border-2 border-black px-2 py-1 text-[10px] font-black uppercase tracking-tighter">
            Top Secret / Boicote Files
          </div>
          <MessageSquareWarning className="mx-auto mb-10 animate-bounce" size={100} />
          <h2 className="text-7xl font-black mb-6 italic tracking-tighter uppercase leading-none">
            VOCÊ FOI <br />
            <span className="bg-black text-white px-4">CANCELADO</span>!
          </h2>
          <div className="space-y-8 text-xl font-bold uppercase leading-tight">
            <p>Seu pedido de pé esquerdo foi interceptado por uma rede de robôs indignados no Twitter.</p>
            <p className="bg-black text-white p-6 border-l-[12px] border-red-600 text-left text-sm italic normal-case">
              "Não compramos chinelos de quem atua bem no cinema. O verdadeiro patriota anda descalço ou de bota militar em dia de sol."
              <br />
              <span className="not-italic font-black">— Comentário real de um post da Zambelli (provavelmente)</span>
            </p>
            <p className="text-red-600 text-2xl">
              O boicote venceu! <br />
              Nada será entregue. A entrega é imediata no Twitter.
            </p>
            <p className="text-sm">Seu dinheiro não foi gasto, mas sua paciência com a política brasileira acaba de ser debitada com sucesso.</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setCart([]);
              setView('home');
            }}
            className="mt-12 bg-black text-white font-black px-12 py-5 text-xl hover:scale-105 transition-transform uppercase italic"
          >
            Voltar para o Grupo da Família
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="font-grotesk selection:bg-red-600 selection:text-white">
      <Navbar />

      {showNotification && (
        <div className="fixed top-24 right-6 z-[100] bg-black text-red-600 p-6 font-black border-4 border-red-600 shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] animate-slide-in">
          ⚠️ ALERTA DE SUBVERSÃO: +1 PÉ ESQUERDO!
        </div>
      )}

      {showPromoPopup && (
        <div className="fixed bottom-6 right-6 z-[90] bg-neutral-900 border border-red-700 text-white p-5 max-w-xs shadow-[8px_8px_0px_0px_rgba(255,0,0,0.4)]">
          <p className="font-black uppercase text-sm">Cupom DRAMA10</p>
          <p className="text-xs text-neutral-400">Use e ganhe frete grátis para entregar tretas no grupo da família.</p>
          <button
            type="button"
            className="mt-3 text-xs uppercase text-red-400 underline"
            onClick={() => setShowPromoPopup(false)}
          >
            Já causei hoje
          </button>
        </div>
      )}

      {view === 'home' && <HomeView />}
      {view === 'catalog' && <CatalogView />}
      {view === 'cart' && <CartView />}
      {view === 'checkout' && <CheckoutView />}
      {view === 'success' && <SuccessView />}

      <footer className="bg-black text-neutral-800 py-16 px-6 text-center border-t-8 border-neutral-900">
        <div className="flex justify-center gap-10 mb-8 opacity-20 grayscale">
          <Footprints size={40} />
          <Footprints size={40} />
          <Footprints size={40} />
        </div>
        <p className="text-xs uppercase tracking-[0.4em] font-black mb-4">
          PÉESQUERDO DOT COM.BR - A MARCA QUE ASSUSTA PARLAMENTARES
        </p>
        <p className="text-[10px] text-neutral-700 max-w-xl mx-auto uppercase font-bold">
          Disclaimer: Este site é uma paródia. Este marketplace não vende produtos, vende tretas. A entrega é imediata no Twitter.
        </p>
      </footer>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes slide-in {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slide-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 15s linear infinite;
        }
      `,
        }}
      />
    </div>
  );
};

export default App;
