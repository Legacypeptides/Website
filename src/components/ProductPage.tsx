import React, { useState } from 'react';
import { X, Star, Shield, Award, Microscope, Plus, Minus, ShoppingCart, ArrowLeft } from 'lucide-react';
import { EditableContent } from './EditableContent';
import { useCart } from './CartProvider';

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  benefits: string[];
  detailedDescription: string;
  specifications: {
    purity: string;
    concentration: string;
    vialSize: string;
    storage: string;
  };
  researchApplications: string[];
  safetyInfo: string;
}

interface ProductPageProps {
  product: Product | null;
  onClose: () => void;
  onProductUpdate: (product: Product) => void;
  isEditing?: boolean;
}

export const ProductPage: React.FC<ProductPageProps> = ({ 
  product, 
  onClose, 
  onProductUpdate, 
  isEditing = false 
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState('description');
  const [selectedMg, setSelectedMg] = useState<string>('');
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderFormData, setOrderFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    product: '5-Amino-1MQ',
    strength: '10mg',
    quantity: 1
  });
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { addToCart } = useCart();

  // Define mg options and pricing for products with multiple options
  const getMgOptions = (productName: string) => {
    switch (productName) {
      case 'GHK-CU':
        return [
          { mg: '50mg', price: 49.95 },
          { mg: '100mg', price: 69.95 }
        ];
      case 'GLP-1 (S)':
        return [
          { mg: '5mg', price: 59.95 },
          { mg: '10mg', price: 99.95 },
          { mg: '15mg', price: 149.95 }
        ];
      case 'GLP-2 (T)':
        return [
          { mg: '5mg', price: 59.95 },
          { mg: '10mg', price: 99.95 },
          { mg: '15mg', price: 149.95 }
        ];
      case 'GLP-3 (RETA)':
        return [
          { mg: '5mg', price: 59.95 },
          { mg: '10mg', price: 99.95 }
        ];
      case 'CAGRILINTIDE':
        return [
          { mg: '5mg', price: 59.95 },
          { mg: '10mg', price: 119.95 }
        ];
      default:
        return [];
    }
  };

  const mgOptions = getMgOptions(product?.name || '');
  const hasMultipleMg = mgOptions.length > 0;

  // Initialize selected mg and price
  React.useEffect(() => {
    if (hasMultipleMg && !selectedMg) {
      setSelectedMg(mgOptions[0].mg);
      setCurrentPrice(mgOptions[0].price);
    } else if (!hasMultipleMg && product) {
      // Extract price from product.price string
      const priceMatch = product.price.match(/\$?(\d+\.?\d*)/);
      setCurrentPrice(priceMatch ? parseFloat(priceMatch[1]) : 0);
    }
  }, [product, hasMultipleMg, mgOptions, selectedMg]);

  const handleMgSelection = (mg: string, price: number) => {
    setSelectedMg(mg);
    setCurrentPrice(price);
  };
  
  if (!product) return null;

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, quantity + change);
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: currentPrice,
      image: product.image,
      category: product.category,
      safeCode: product.safeCode || ''
    }, quantity);
    
    // Show success message
    setShowSuccessMessage(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
    
    setQuantity(1); // Reset quantity after adding
    
    // Close product page and scroll to products section
    setTimeout(() => {
      onClose();
      const productsSection = document.getElementById('products');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1000); // Wait 1 second to show success message first
  };

  const handleContentChange = (field: string, value: string) => {
    const updatedProduct = { ...product, [field]: value };
    onProductUpdate(updatedProduct);
  };

  const handleSpecificationChange = (field: string, value: string) => {
    const updatedProduct = {
      ...product,
      specifications: { ...product.specifications, [field]: value }
    };
    onProductUpdate(updatedProduct);
  };

  const handleBenefitChange = (index: number, value: string) => {
    const updatedBenefits = [...product.benefits];
    updatedBenefits[index] = value;
    const updatedProduct = { ...product, benefits: updatedBenefits };
    onProductUpdate(updatedProduct);
  };

  const handleApplicationChange = (index: number, value: string) => {
    const updatedApplications = [...product.researchApplications];
    updatedApplications[index] = value;
    const updatedProduct = { ...product, researchApplications: updatedApplications };
    onProductUpdate(updatedProduct);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Products
          </button>
          {isEditing && (
            <div className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-semibold">
              Editing Product Page - Click on text to edit
            </div>
          )}
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 text-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-96 object-contain mx-auto drop-shadow-lg"
                />
              </div>
              
              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Shield className="text-blue-600 mx-auto mb-2" size={24} />
                  <p className="text-sm font-semibold text-blue-800">Purity Guarantee</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Award className="text-blue-600 mx-auto mb-2" size={24} />
                  <p className="text-sm font-semibold text-blue-800">Lab Tested</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Microscope className="text-blue-600 mx-auto mb-2" size={24} />
                  <p className="text-sm font-semibold text-blue-800">Pharm Grade</p>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              {/* Product Info */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    <EditableContent
                      content={product.category}
                      onSave={(value) => handleContentChange('category', value)}
                      isEditable={isEditing}
                    />
                  </span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  <EditableContent
                    content={product.name}
                    onSave={(value) => handleContentChange('name', value)}
                    isEditable={isEditing}
                  />
                </h1>

                <div className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {(() => {
                    const getProductDescription = (productName: string) => {
                      switch (productName) {
                        case '5-AMINO-1MQ':
                          return '5-Amino-1MQ is a small molecule peptide that targets and inhibits nicotinamide N-methyltransferase (NNMT), an enzyme involved in fat storage and metabolic processes. By blocking NNMT, 5-Amino-1MQ enhances cellular energy production and improves mitochondrial activity, leading to increased energy expenditure and fat metabolism. It supports weight management and metabolic health, making it an effective tool for improving overall physical performance.';
                        case 'AOD-9604':
                          return 'A modified fragment of human growth hormone (HGH), AOD 9604 stimulates fat breakdown without affecting blood sugar or muscle growth. It enhances lipolysis (fat burning) and prevents lipogenesis (fat accumulation). It is commonly used for weight loss and obesity management.';
                        case 'BPC-157':
                          return 'BPC-157 promotes tissue repair, reduces inflammation, and accelerates healing in muscles, tendons, and the gut. It works by enhancing blood flow and stimulating growth factors for regeneration. It is widely used for injury recovery, gut health, and pain relief.';
                        case 'BPC-157 / TB-500':
                          return 'BPC-157 and TB 500 work synergistically to promote tissue repair and accelerate healing by stimulating cell regeneration and collagen production. BPC-157 helps with joint, ligament, and tendon healing, while TB 500 enhances muscle repair and reduces inflammation. The blend offers benefits such as faster recovery from injuries, improved flexibility, and reduced pain and inflammation.';
                        case 'CAGRILINTIDE':
                          return 'Cagrilintide is currently being studied for its potential in appetite regulation and weight management support. Research suggests it may play a role in reducing food intake and supporting healthy body composition, making it a popular subject in metabolic health studies.';
                        case 'CJC-1295 / IPAMORELIN':
                          return 'A synergistic peptide blend researched for its role in growth hormone release, recovery, and vitality.';
                        case 'DSIP':
                          return 'DSIP is a naturally occurring neuropeptide found in the brain and cerebrospinal fluid. It interacts with various endocrine and neurochemical systems to regulate sleep by promoting delta (slow-wave) sleep patterns, influence the hypothalamic-pituitary axis, potentially modulate NMDA receptor activity, and reduce stress-related hormone release (e.g., cortisol).';
                        case 'EPITALON':
                          return 'A synthetic version of Epitalon, this peptide regulates telomerase activity, which helps maintain and lengthen telomeres in DNA. It is linked to anti-aging effects, immune system support, and improved sleep quality. It may also enhance longevity and overall cellular health.';
                        case 'GHK-CU':
                          return 'GHK-Cu is a copper peptide that promotes tissue repair by stimulating collagen production, enhancing wound healing, and reducing inflammation. It improves skin elasticity, reduces wrinkles, and supports overall skin rejuvenation. Additionally, GHK-Cu has regenerative effects on other tissues, such as muscles and cartilage, and may offer neuroprotective benefits.';
                        case 'GLOW':
                          return 'GLOW BLEND: BPC-157 10mg + TB-500 (Thymosin Beta-4) 10mg + GHK-CU 50mg';
                        case 'GLP-1 (S)':
                          return 'GLP-1(S) is a GLP-1 receptor agonist that improves blood sugar regulation, promotes weight loss, and enhances cardiovascular health. It works by increasing insulin secretion, slowing gastric emptying, and reducing appetite, making it an effective treatment for type 2 diabetes and obesity. GLP-1(S) has gained popularity as a weight loss therapy due to its ability to help individuals maintain long-term appetite control and fat reduction.';
                        case 'GLP-2 (T)':
                          return 'GLP-2(T) is a dual GIP (glucose-dependent insulinotropic polypeptide) and GLP-1 (glucagon-like peptide-1) receptor agonist that enhances insulin secretion, suppresses appetite, and improves blood sugar control. It mimics natural gut hormones to regulate metabolism, leading to significant weight loss and better glucose management in individuals with type 2 diabetes. This peptide is primarily used for weight loss, diabetes management, and improving metabolic health.';
                        case 'GLP-3 (RETA)':
                          return 'GLP-3(Reta) is an innovative medication that works by mimicking three important hormones: GLP-1, GIP, and glucagon (GCG). These hormones are crucial in regulating metabolism and blood sugar levels. When GLP-3(Reta) is taken, it stimulates the pancreas to release more insulin, which helps lower blood sugar levels. It also signals the brain to reduce appetite and increase the feeling of fullness after meals, making it easier for individuals to eat less and lose weight. One of the significant benefits of GLP-3(Reta) is its ability to enhance fat metabolism. This means it helps the body break down and utilize stored fat more efficiently, converting it into energy. By addressing both blood sugar control and weight management, GLP-3(Reta) offers a comprehensive treatment option for people with type 2 diabetes and obesity.';
                        case 'IPAMORELIN':
                          return 'Ipamorelin is a selective GH secretagogue that stimulates GH release without significantly affecting cortisol or prolactin levels. It supports muscle growth, fat loss, and faster recovery while improving sleep quality. Due to its mild side effect profile, it is commonly used in anti-aging and performance-enhancing treatments.';
                        case 'KISSPEPTIN':
                          return 'Kisspeptin plays a critical role in reproductive hormone regulation by stimulating gonadotropin-releasing hormone (GnRH) secretion. It helps initiate puberty, regulate fertility, and maintain hormone balance in both men and women. Research suggests it may also have potential benefits in treating infertility and certain hormonal disorders.';
                        case 'MELANOTAN 1':
                          return 'Melanotan 1 Injectable – Melanotan 1 functions similarly to Melanotan 2 but is more selective in stimulating melanin production without affecting libido. It is used for tanning, skin protection, and treating skin conditions like vitiligo. This peptide offers a longer-lasting tan with reduced risk of UV damage.';
                        case 'MELANOTAN 2':
                          return 'Melanotan 2 Injectable – Melanotan 2 is a synthetic peptide that stimulates melanin production, leading to skin darkening and UV protection. It also has aphrodisiac effects and can suppress appetite, making it popular for tanning and weight management. Users seek it as an alternative to sun exposure for achieving a darker complexion.';
                        case 'MOTS-C':
                          return 'MOTS-C is a mitochondrial-derived peptide that enhances energy metabolism and improves insulin sensitivity. It activates AMPK pathways, promoting fat loss, increased endurance, and potential longevity benefits. It is being studied for its role in metabolic health, aging, and exercise performance.';
                        case 'NAD+':
                          return 'NAD+ is a vital coenzyme that plays a crucial role in cellular energy production, DNA repair, and mitochondrial function. It supports healthy aging, boosts metabolism, and enhances brain function by activating sirtuins, proteins linked to longevity and cellular repair. NAD+ supplementation is used to improve energy levels, cognitive performance, and overall longevity.';
                        case 'PT-141':
                          return 'PT-141 is a peptide that works by stimulating melanocortin receptors to enhance sexual arousal and libido. Unlike traditional ED treatments, it works through the central nervous system, making it effective for both men and women. It is FDA-approved for treating hypo-active sexual desire disorder (HSDD) in women.';
                        case 'SELANK':
                          return 'Selank is a nootropic and anxiolytic peptide that modulates neurotransmitters, reducing stress and anxiety while enhancing cognitive function. It has potential immune-boosting and mood-stabilizing properties. It is often used for improving focus, memory, and emotional well-being.';
                        case 'SEMAX':
                          return 'Semax is a synthetic peptide that enhances cognitive function, neuroprotection, and memory retention. It increases brain-derived neurotrophic factor (BDNF) levels, supporting brain plasticity and reducing inflammation. It is used to improve focus, mental clarity, and recovery from neurological conditions.';
                        case 'SERMORELIN':
                          return 'Sermorelin is a GH-releasing hormone (GHRH) analog that stimulates the pituitary gland to produce and release natural growth hormone. It is used to enhance muscle growth, improve recovery, and support overall anti-aging benefits. It is often prescribed for those with GH deficiencies to restore youthful hormone levels naturally.';
                        case 'SLU-PP-332':
                          return 'SLU-PP-332 is a synthetic compound that activates estrogen-related receptors, enhancing mitochondrial function and cellular respiration in muscle cells. This activation leads to increased energy expenditure, improved fatty acid oxidation, and reduced fat accumulation. Its benefits include enhanced exercise endurance, improved insulin sensitivity, and potential cardioprotective effects.';
                        case 'SS-31':
                          return 'SS-31 is a synthetic peptide that targets and binds to mitochondria, improving their function and protecting them from oxidative damage. It enhances mitochondrial energy production and reduces cellular stress, promoting better cell health. Benefits include improved endurance, enhanced cognitive function, and potential protection against age-related diseases and mitochondrial dysfunction.';
                        case 'TB-500':
                          return 'TB-500 is a synthetic version of Thymosin Beta 4, a peptide that promotes tissue regeneration, wound healing, and inflammation reduction. It works by stimulating cell migration, new blood vessel formation, and reducing fibrosis, making it beneficial for muscle, joint, and connective tissue repair. This peptide is commonly used in sports medicine and recovery treatments to accelerate healing and improve mobility.';
                        case 'TESAMORELIN / IPAMORELIN':
                          return 'Tesamorelin and Ipamorelin, when combined, create a potent peptide blend that stimulates growth hormone release, promoting muscle growth and fat reduction. Ipamorelin works by mimicking ghrelin, the hunger hormone, thereby enhancing growth hormone secretion without affecting cortisol levels. Tesamorelin, on the other hand, targets the pituitary gland to boost growth hormone production, aiding in the reduction of visceral fat and improving metabolic functions. Together, these peptides contribute to enhanced muscle strength, improved body composition, and overall vitality. Additionally, they may support cognitive functions and improve sleep quality, making them valuable for holistic health and anti-aging regimens.';
                        case 'TESAMORELIN':
                          return 'Tesamorelin is a growth hormone-releasing hormone (GHRH) analog that stimulates the pituitary gland to naturally produce and release more growth hormone. It is primarily used to reduce visceral fat in individuals with HIV-associated lipodystrophy but also supports metabolism, muscle growth, and cognitive function. By increasing GH levels, it enhances fat loss, improves body composition, and may offer anti-aging benefits.';
                        case 'THYMOSIN ALPHA-1':
                          return 'Thymosin Alpha 1 is a peptide that enhances immune system function by stimulating T-cell production and modulating inflammation. It helps the body fight infections, autoimmune conditions, and even cancer by improving immune response and reducing excessive inflammation. This peptide is widely researched for its potential in treating chronic infections, immune disorders, and supporting overall immune health.';
                        default:
                          return product.description;
                      }
                    };
                    
                    return isEditing ? (
                      <EditableContent
                        content={product.description}
                        onSave={(value) => handleContentChange('description', value)}
                        isEditable={isEditing}
                      />
                    ) : (
                      <p>{getProductDescription(product.name)}</p>
                    );
                  })()}
                </div>

                {/* Benefits */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Key Benefits</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.benefits.map((benefit, i) => (
                      <span key={i} className="bg-gold-100 text-gold-800 px-3 py-1 rounded-full text-sm font-medium">
                        <EditableContent
                          content={benefit}
                          onSave={(value) => handleBenefitChange(i, value)}
                          isEditable={isEditing}
                        />
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mg Selection Bubbles */}
              {hasMultipleMg && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Select Strength</h3>
                  <div className="flex flex-wrap gap-3">
                    {mgOptions.map((option) => (
                      <button
                        key={option.mg}
                        onClick={() => handleMgSelection(option.mg, option.price)}
                        className={`px-4 py-2 rounded-full border-2 font-semibold transition-all duration-200 ${
                          selectedMg === option.mg
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:text-blue-600'
                        }`}
                      >
                        {option.mg} - ${option.price.toFixed(2)}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Single Mg Display for products without multiple options */}
              {!hasMultipleMg && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Strength</h3>
                  <div className="flex flex-wrap gap-3">
                    <div className="px-4 py-2 rounded-full border-2 border-blue-600 bg-blue-600 text-white font-semibold">
                      {(() => {
                        switch (product.name) {
                          case '5-AMINO-1MQ': return '10mg';
                          case 'AOD-9604': return '5mg';
                          case 'BPC-157 / TB-500': return '5mg / 5mg';
                          case 'GLOW': return '70mg';
                          case 'BPC-157': return '10mg';
                          case 'IPAMORELIN': return '10mg';
                          case 'MOTS-C': return '10mg';
                          case 'NAD+': return '500mg';
                          case 'TESAMORELIN': return '10mg';
                          case 'THYMOSIN ALPHA-1': return '10mg';
                          case 'CJC-1295 / IPAMORELIN': return '5mg / 5mg';
                          case 'DSIP': return '5mg';
                          case 'EPITALON': return '10mg';
                          case 'KISSPEPTIN': return '10mg';
                          case 'MELANOTAN 1': return '10mg';
                          case 'MELANOTAN 2': return '10mg';
                          case 'PT-141': return '10mg';
                          case 'SELANK': return '5mg';
                          case 'SEMAX': return '5mg';
                          case 'SERMORELIN': return '10mg';
                          case 'SLU-PP-332': return '5mg';
                          case 'SS-31': return '10mg';
                          case 'TB-500': return '10mg';
                          case 'TESAMORELIN / IPAMORELIN': return '5mg / 5mg';
                          case 'BACTERIOSTATIC WATER': return '10ml';
                          default: return '10mg';
                        }
                      })()}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Price and Add to Cart */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-3xl font-bold text-blue-600">
                      ${currentPrice.toFixed(2)}
                    </span>
                    <span className="text-gray-600 ml-2">per vial</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-green-600 font-semibold">🚚 FREE SHIPPING</p>
                    <p className="text-sm text-green-600 font-semibold">In Stock</p>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-semibold text-gray-900">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="p-2 hover:bg-gray-100 transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-4 py-2 font-semibold">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="p-2 hover:bg-gray-100 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-to-r from-gold-500 to-gold-600 text-blue-900 py-4 px-6 rounded-lg font-bold text-lg hover:from-gold-400 hover:to-gold-500 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Add to Cart - ${(currentPrice * quantity).toFixed(2)}
                </button>

              </div>
            </div>
          </div>

          {/* Success Message */}
          {showSuccessMessage && (
            <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-6 py-4 rounded-lg shadow-xl animate-fade-in">
              <div className="flex items-center gap-3">
                <div className="bg-white rounded-full p-1">
                  <ShoppingCart className="text-green-600" size={16} />
                </div>
                <div>
                  <p className="font-semibold">Success!</p>
                  <p className="text-sm">Your item was added to your cart. Go to checkout when ready.</p>
                </div>
              </div>
            </div>
          )}

          {/* Product Details Tabs */}
          <div className="mt-12">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8">
                {[
                  { id: 'description', label: 'Description' },
                  { id: 'specifications', label: 'Specifications' },
                  { id: 'research', label: 'Research Applications' },
                  { id: 'safety', label: 'Disclaimer' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      selectedTab === tab.id
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="py-8">
              {selectedTab === 'description' && (
                <div className="prose max-w-none">
                  <p className="text-gray-600 leading-relaxed">
                    {product.detailedDescription}
                  </p>
                </div>
              )}

              {selectedTab === 'specifications' && (
                <div className="grid md:grid-cols-2 gap-6">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </h4>
                      <p className="text-gray-600">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {selectedTab === 'research' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Research Applications</h3>
                  <ul className="space-y-3">
                    {product.researchApplications.map((application, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600">{application}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedTab === 'safety' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Disclaimer</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {product.safetyInfo}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};