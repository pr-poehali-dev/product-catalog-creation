import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  specs: string[];
}

const products: Product[] = [
  {
    id: 1,
    name: 'UltraBook Pro X1',
    category: 'Ноутбуки',
    price: 89990,
    rating: 4.8,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
    specs: ['Intel Core i7', '16GB RAM', '512GB SSD', '14" OLED']
  },
  {
    id: 2,
    name: 'SmartPhone Nova 12',
    category: 'Смартфоны',
    price: 54990,
    rating: 4.9,
    reviews: 567,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
    specs: ['Snapdragon 8 Gen 2', '12GB RAM', '256GB', '6.7" AMOLED']
  },
  {
    id: 3,
    name: 'Gaming Beast Z9',
    category: 'Ноутбуки',
    price: 149990,
    rating: 4.7,
    reviews: 189,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=300&fit=crop',
    specs: ['RTX 4080', '32GB RAM', '1TB SSD', '17" 240Hz']
  },
  {
    id: 4,
    name: 'AirPods Max Pro',
    category: 'Наушники',
    price: 34990,
    rating: 4.6,
    reviews: 423,
    image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=300&fit=crop',
    specs: ['ANC', '40 часов', 'Spatial Audio', 'USB-C']
  },
  {
    id: 5,
    name: 'Smart Watch Ultra',
    category: 'Умные часы',
    price: 44990,
    rating: 4.8,
    reviews: 312,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=300&fit=crop',
    specs: ['AMOLED', 'GPS', '7 дней', 'IP68']
  },
  {
    id: 6,
    name: 'Tablet Creator 11',
    category: 'Планшеты',
    price: 64990,
    rating: 4.7,
    reviews: 198,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
    specs: ['M2 Chip', '8GB RAM', '11" Liquid Retina', 'Apple Pencil']
  }
];

const categories = ['Все', 'Ноутбуки', 'Смартфоны', 'Наушники', 'Умные часы', 'Планшеты'];

const stores = [
  { id: 1, name: 'TechnoZone', products: 1247, rating: 4.9, logo: '🏪' },
  { id: 2, name: 'Digital World', products: 983, rating: 4.7, logo: '🌐' },
  { id: 3, name: 'Gadget Pro', products: 756, rating: 4.8, logo: '📱' },
  { id: 4, name: 'ElectroMarket', products: 1534, rating: 4.6, logo: '⚡' }
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [compare, setCompare] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'Все' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleCompare = (id: number) => {
    setCompare(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 z-50 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-orbitron font-bold gradient-text">TECH CATALOG</h1>
            <div className="flex gap-3">
              <Button variant="ghost" size="icon" className="relative hover:bg-primary/10">
                <Icon name="Heart" size={20} />
                {favorites.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-secondary text-xs">
                    {favorites.length}
                  </Badge>
                )}
              </Button>
              <Button variant="ghost" size="icon" className="relative hover:bg-primary/10">
                <Icon name="GitCompare" size={20} />
                {compare.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-secondary text-xs">
                    {compare.length}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
          <div className="relative">
            <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Поиск товаров..." 
              className="pl-10 bg-card border-border"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-background"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-5xl md:text-7xl font-orbitron font-bold mb-6 gradient-text">
              БУДУЩЕЕ УЖЕ ЗДЕСЬ
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Сравнивайте характеристики, читайте обзоры и находите лучшие предложения
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
                <Icon name="ShoppingCart" size={20} className="mr-2" />
                Начать покупки
              </Button>
              <Button size="lg" variant="outline" className="border-primary hover:bg-primary/10">
                <Icon name="Play" size={20} className="mr-2" />
                Видео обзор
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="catalog" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="catalog" className="font-orbitron">
              <Icon name="Grid3x3" size={16} className="mr-2" />
              Каталог
            </TabsTrigger>
            <TabsTrigger value="stores" className="font-orbitron">
              <Icon name="Store" size={16} className="mr-2" />
              Магазины
            </TabsTrigger>
            <TabsTrigger value="compare" className="font-orbitron">
              <Icon name="GitCompare" size={16} className="mr-2" />
              Сравнение
            </TabsTrigger>
          </TabsList>

          <TabsContent value="catalog" className="space-y-8">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? 'bg-gradient-to-r from-primary to-secondary' : 'hover:bg-primary/10'}
                >
                  {category}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <Card 
                  key={product.id} 
                  className="glass-card overflow-hidden group hover:scale-[1.02] transition-transform duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                        onClick={() => toggleFavorite(product.id)}
                      >
                        <Icon 
                          name="Heart" 
                          size={16} 
                          className={favorites.includes(product.id) ? 'fill-current text-red-500' : ''} 
                        />
                      </Button>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                        onClick={() => toggleCompare(product.id)}
                      >
                        <Icon 
                          name="GitCompare" 
                          size={16}
                          className={compare.includes(product.id) ? 'text-primary' : ''} 
                        />
                      </Button>
                    </div>
                    <Badge className="absolute bottom-2 left-2 bg-primary text-primary-foreground">
                      {product.category}
                    </Badge>
                  </div>
                  <CardContent className="p-4 space-y-3">
                    <h3 className="font-orbitron font-semibold text-lg">{product.name}</h3>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Icon 
                            key={i} 
                            name="Star" 
                            size={14} 
                            className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {product.specs.map((spec, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-2xl font-orbitron font-bold gradient-text">
                        {product.price.toLocaleString()} ₽
                      </span>
                      <Button size="sm" className="bg-gradient-to-r from-primary to-secondary">
                        <Icon name="ShoppingCart" size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="stores" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stores.map((store, index) => (
                <Card 
                  key={store.id}
                  className="glass-card hover:scale-[1.02] transition-transform duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="text-5xl">{store.logo}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-orbitron font-bold mb-2">{store.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <Icon name="Package" size={14} />
                            {store.products} товаров
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon name="Star" size={14} className="fill-yellow-400 text-yellow-400" />
                            {store.rating}
                          </span>
                        </div>
                        <Button className="w-full bg-gradient-to-r from-primary to-secondary">
                          <Icon name="ExternalLink" size={16} className="mr-2" />
                          Перейти в магазин
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="compare" className="space-y-6">
            {compare.length === 0 ? (
              <Card className="glass-card">
                <CardContent className="p-12 text-center">
                  <Icon name="GitCompare" size={48} className="mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-orbitron font-bold mb-2">Нет товаров для сравнения</h3>
                  <p className="text-muted-foreground">
                    Добавьте товары из каталога, чтобы сравнить их характеристики
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.filter(p => compare.includes(p.id)).map((product) => (
                  <Card key={product.id} className="glass-card">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <h3 className="font-orbitron font-semibold">{product.name}</h3>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={() => toggleCompare(product.id)}
                        >
                          <Icon name="X" size={16} />
                        </Button>
                      </div>
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-32 object-cover rounded"
                      />
                      <div className="space-y-2">
                        {product.specs.map((spec, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <Icon name="Check" size={14} className="text-primary" />
                            <span>{spec}</span>
                          </div>
                        ))}
                      </div>
                      <div className="text-xl font-orbitron font-bold gradient-text pt-2">
                        {product.price.toLocaleString()} ₽
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h3 className="text-2xl font-orbitron font-bold gradient-text mb-4">TECH CATALOG</h3>
            <p className="text-muted-foreground mb-4">
              Ваш надежный помощник в выборе техники
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="ghost" size="icon">
                <Icon name="Youtube" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Instagram" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Twitter" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
