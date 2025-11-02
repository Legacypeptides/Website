import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

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

interface ProductsSectionProps {
  onProductSelect: (product: Product) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({ onProductSelect }) => {
  const [successMessages, setSuccessMessages] = useState<Record<string, boolean>>({});
  const [soldOutProducts, setSoldOutProducts] = useState<Record<string, boolean>>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
    loadSoldOutProducts();
  }, []);

  const loadProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error('Error loading products:', error);
      setProducts(hardcodedProducts);
      setLoading(false);
      return;
    }

    if (!data || data.length === 0) {
      setProducts(hardcodedProducts);
      setLoading(false);
      return;
    }

    const formattedProducts: Product[] = data.map((p: any) => ({
      id: p.product_id,
      name: p.name,
      category: p.category,
      safeCode: p.safe_code || '',
      price: `$${p.price.toFixed(2)}`,
      rating: p.rating || 4.5,
      reviews: p.reviews || 0,
      image: p.image,
      description: p.description,
      benefits: p.benefits || [],
      detailedDescription: p.detailed_description,
      specifications: {
        purity: p.purity || 'Purity Guaranteed',
        concentration: p.concentration,
        vialSize: p.vial_size || '3ml',
        storage: p.storage || 'Store at -20°C'
      },
      researchApplications: p.research_applications || [],
      safetyInfo: p.safety_info || 'All products sold by Legacy Peptides are intended strictly for laboratory research and analytical purposes.'
    }));

    setProducts(formattedProducts);
    setLoading(false);
  };

  const loadSoldOutProducts = async () => {
    const { data, error } = await supabase
      .from('product_inventory')
      .select('*')
      .eq('is_sold_out', true);

    if (error) {
      console.error('Error loading sold out products:', error);
      return;
    }

    const soldOutMap: Record<string, boolean> = {};
    data?.forEach((item: any) => {
      soldOutMap[item.product_id] = true;
    });

    setSoldOutProducts(soldOutMap);
  };

  const hardcodedProducts: Product[] = [
    {
      id: '1',
      name: '5-AMINO-1MQ',
      category: 'Metabolic',
      safeCode: 'HL-AMINO10',
      price: '$49.95',
      rating: 4.8,
      reviews: 127,
      image: '5-AMINO-1MQ.png',
      description: 'A research peptide explored for its potential in energy and metabolism support.',
      benefits: ['Metabolic Research', 'Cellular Energy', 'NNMT Inhibition'],
      detailedDescription: '5-Amino-1MQ is a small molecule that has gained attention in research for its potential role in cellular metabolism. This compound works by inhibiting nicotinamide N-methyltransferase (NNMT), an enzyme involved in cellular energy regulation. Research suggests that 5-Amino-1MQ may support metabolic function and energy production at the cellular level, making it an interesting compound for metabolic research applications.',
      specifications: {
        purity: 'Purity Guaranteed',
        concentration: '10mg per vial',
        vialSize: '3ml',
        storage: 'Store at -20°C'
      },
      researchApplications: [
        'Metabolic pathway research',
        'NNMT enzyme inhibition studies',
        'Cellular energy metabolism research',
        'NAD+ pathway investigations',
        'Mitochondrial function studies'
      ],
      safetyInfo: 'All products sold by Legacy Peptides are intended strictly for laboratory research and analytical purposes. These materials are not intended for human or animal use, and are not approved for any therapeutic, diagnostic, or medical application. Legacy Peptides does not provide instructions or guidance regarding preparation, reconstitution, administration, or dosage. No product sold is classified as a drug, dietary supplement, or medical device under federal law. All items are labeled "For Research Use Only – Not for Human or Animal Use" in accordance with 21 CFR 809.10(c). Any misuse or unauthorized application is strictly prohibited and may violate applicable laws.'
    },
    {
      id: '2',
      name: 'AOD-9604',
      category: 'Research',
      safeCode: 'HL-AOD5',
      price: '$59.95',
      rating: 4.7,
      reviews: 89,
      image: 'AOD-9604.png',
      description: 'Studied for its role in fat metabolism and weight management research.',
      benefits: ['Fat Metabolism', 'Pharm Grade', 'HGH Fragment'],
      detailedDescription: 'AOD-9604 is a synthetic peptide fragment derived from human growth hormone (HGH). This peptide has been extensively studied for its potential role in fat metabolism and body composition research. Unlike full-length growth hormone, AOD-9604 appears to retain the fat-burning properties while avoiding other effects. Research has focused on its potential mechanisms in lipolysis and metabolic regulation.',
      specifications: {
        purity: 'Purity Guaranteed',
        concentration: '5mg per vial',
        vialSize: '3ml',
        storage: 'Store at -20°C'
      },
      researchApplications: [
        'Fat metabolism research',
        'Lipolysis pathway studies',
        'Body composition research',
        'Growth hormone fragment analysis',
        'Metabolic regulation studies'
      ],
      safetyInfo: 'All products sold by Legacy Peptides are intended strictly for laboratory research and analytical purposes. These materials are not intended for human or animal use, and are not approved for any therapeutic, diagnostic, or medical application. Legacy Peptides does not provide instructions or guidance regarding preparation, reconstitution, administration, or dosage. No product sold is classified as a drug, dietary supplement, or medical device under federal law. All items are labeled "For Research Use Only – Not for Human or Animal Use" in accordance with 21 CFR 809.10(c). Any misuse or unauthorized application is strictly prohibited and may violate applicable laws.'
    },
    {
      id: '3',
      name: 'BPC-157 / TB-500',
      category: 'Recovery',
      safeCode: 'HL-BWATER10',
      price: '$89.95',
      rating: 4.9,
      reviews: 156,
      image: 'BPC-157 -TB500.png',
      description: 'A synergistic blend studied for supporting healing, recovery, and performance.',
      benefits: ['Tissue Repair', 'Healing Research', 'Combination Formula'],
      detailedDescription: 'This combination formula brings together two of the most researched peptides in recovery science. BPC-157, known as the "body protection compound," has been extensively studied for its potential tissue repair properties. TB-500, derived from Thymosin Beta-4, has been researched for its role in cellular migration and tissue regeneration. Together, these peptides create a synergistic research compound for studying healing and recovery mechanisms.',
      specifications: {
        purity: 'Purity Guaranteed',
        concentration: '5mg BPC-157 + 5mg TB-500 per vial',
        vialSize: '3ml',
        storage: 'Store at -20°C'
      },
      researchApplications: [
        'Tissue repair mechanism studies',
        'Wound healing research',
        'Cellular migration analysis',
        'Angiogenesis research',
        'Recovery pathway investigations'
      ],
      safetyInfo: 'All products sold by Legacy Peptides are intended strictly for laboratory research and analytical purposes. These materials are not intended for human or animal use, and are not approved for any therapeutic, diagnostic, or medical application. Legacy Peptides does not provide instructions or guidance regarding preparation, reconstitution, administration, or dosage. No product sold is classified as a drug, dietary supplement, or medical device under federal law. All items are labeled "For Research Use Only – Not for Human or Animal Use" in accordance with 21 CFR 809.10(c). Any misuse or unauthorized application is strictly prohibited and may violate applicable laws.'
    },
    {
      id: '4',
      name: 'GHK-CU',
      category: 'Regenerative',
      safeCode: 'HL-BPC10',
      price: 'Starting at $49.95',
      rating: 4.6,
      reviews: 73,
      image: 'GHK-CU.png',
      description: 'Copper peptide researched for its skin, hair, and tissue regeneration benefits.',
      benefits: ['Collagen Research', 'Copper Complex', 'Regenerative'],
      detailedDescription: 'GHK-Cu is a naturally occurring copper peptide complex that has been extensively researched for its regenerative properties. This tripeptide-copper complex has been studied for its potential role in collagen synthesis, wound healing, and tissue remodeling. Research has shown its involvement in various cellular processes including antioxidant activity, anti-inflammatory responses, and tissue repair mechanisms.',
      specifications: {
        purity: 'Purity Guaranteed',
        concentration: '50mg or 100mg per vial',
        vialSize: '3ml',
        storage: 'Store at -20°C'
      },
      researchApplications: [
        'Collagen synthesis research',
        'Wound healing studies',
        'Anti-aging mechanism research',
        'Copper peptide complex analysis',
        'Tissue remodeling investigations'
      ],
      safetyInfo: 'All products sold by Legacy Peptides are intended strictly for laboratory research and analytical purposes. These materials are not intended for human or animal use, and are not approved for any therapeutic, diagnostic, or medical application. Legacy Peptides does not provide instructions or guidance regarding preparation, reconstitution, administration, or dosage. No product sold is classified as a drug, dietary supplement, or medical device under federal law. All items are labeled "For Research Use Only – Not for Human or Animal Use" in accordance with 21 CFR 809.10(c). Any misuse or unauthorized application is strictly prohibited and may violate applicable laws.'
    },
    {
      id: '5',
      name: 'GLOW',
      category: 'Cosmetic Research',
      safeCode: 'HL-BPC-TB5',
      price: '$109.95',
      rating: 4.8,
      reviews: 94,
      image: 'GLOW.png',
      description: 'Custom peptide blend designed to support radiant skin and overall wellness.',
      benefits: ['Skin Research', 'Peptide Complex', 'Cosmetic Grade'],
      detailedDescription: 'GLOW is a proprietary peptide complex specifically formulated for cosmetic and dermatological research. This unique blend combines multiple bioactive peptides that have been individually studied for their potential effects on skin health, cellular regeneration, and overall wellness. The formulation represents cutting-edge research in peptide science and cosmetic applications.',
      specifications: {
        purity: 'Purity Guaranteed',
        concentration: '70mg complex per vial',
        vialSize: '3ml',
        storage: 'Store at -20°C'
      },
      researchApplications: [
        'Cosmetic peptide research',
        'Skin health mechanism studies',
        'Anti-aging compound analysis',
        'Dermatological research applications',
        'Peptide complex efficacy studies'
      ],
      safetyInfo: 'All products sold by Legacy Peptides are intended strictly for laboratory research and analytical purposes. These materials are not intended for human or animal use, and are not approved for any therapeutic, diagnostic, or medical application. Legacy Peptides does not provide instructions or guidance regarding preparation, reconstitution, administration, or dosage. No product sold is classified as a drug, dietary supplement, or medical device under federal law. All items are labeled "For Research Use Only – Not for Human or Animal Use" in accordance with 21 CFR 809.10(c). Any misuse or unauthorized application is strictly prohibited and may violate applicable laws.'
    },
    {
      id: '6',
      name: 'BPC-157',
      category: 'Recovery',
      safeCode: 'HL-CAG5',
      price: '$49.95',
      rating: 4.9,
      reviews: 98,
      image: 'BPC-157 10MG.png',
      description: 'Well-known in research for its potential benefits in tissue repair and recovery.',
      benefits: ['Tissue Repair', 'Anti-Inflammatory', 'Gut Health'],
      detailedDescription: 'BPC-157, also known as Body Protection Compound-157, is a pentadecapeptide derived from human gastric juice. This peptide has been extensively researched for its potential therapeutic properties, particularly in tissue repair and healing. Studies have investigated its effects on various biological systems, including the gastrointestinal tract, musculoskeletal system, and vascular system.',
      specifications: {
        purity: 'Purity Guaranteed',
        concentration: '10mg per vial',
        vialSize: '3ml',
        storage: 'Store at -20°C'
      },
      researchApplications: [
        'Tissue repair research',
        'Gastrointestinal health studies',
        'Wound healing investigations',
        'Anti-inflammatory pathway research',
        'Vascular health studies'
      ],
      safetyInfo: 'All products sold by Legacy Peptides are intended strictly for laboratory research and analytical purposes. These materials are not intended for human or animal use, and are not approved for any therapeutic, diagnostic, or medical application. Legacy Peptides does not provide instructions or guidance regarding preparation, reconstitution, administration, or dosage. No product sold is classified as a drug, dietary supplement, or medical device under federal law. All items are labeled "For Research Use Only – Not for Human or Animal Use" in accordance with 21 CFR 809.10(c). Any misuse or unauthorized application is strictly prohibited and may violate applicable laws.'
    },
    {
      id: '7',
      name: 'IPAMORELIN',
      category: 'Growth Hormone',
      safeCode: 'HL-IPA10',
      price: '$59.95',
      rating: 4.8,
      reviews: 145,
      image: 'IPAMORELIN.png',
      description: 'Growth hormone releasing peptide studied for its potential in growth hormone stimulation.',
      benefits: ['GH Release', 'Recovery Research', 'Performance'],
      detailedDescription: 'Ipamorelin is a selective growth hormone secretagogue that has been extensively studied for its ability to stimulate growth hormone release. This pentapeptide is known for its specificity and minimal side effects compared to other growth hormone releasing compounds. Research has focused on its potential applications in growth hormone deficiency studies and metabolic research.',
      specifications: {
        purity: 'Purity Guaranteed',
        concentration: '10mg per vial',
        vialSize: '3ml',
        storage: 'Store at -20°C'
      },
      researchApplications: [
        'Growth hormone release studies',
        'Metabolic research applications',
        'Recovery mechanism investigations',
        'Aging research studies',
        'Body composition research'
      ],
      safetyInfo: 'All products sold by Legacy Peptides are intended strictly for laboratory research and analytical purposes. These materials are not intended for human or animal use, and are not approved for any therapeutic, diagnostic, or medical application. Legacy Peptides does not provide instructions or guidance regarding preparation, reconstitution, administration, or dosage. No product sold is classified as a drug, dietary supplement, or medical device under federal law. All items are labeled "For Research Use Only – Not for Human or Animal Use" in accordance with 21 CFR 809.10(c). Any misuse or unauthorized application is strictly prohibited and may violate applicable laws.'
    },
    {
      id: '8',
      name: 'MOTS-C',
      category: 'Mitochondrial',
      safeCode: 'HL-DSIP5',
      price: '$54.95',
      rating: 4.7,
      reviews: 98,
      image: 'MOTS-C.png',
      description: 'Mitochondrial-derived peptide researched for metabolic and longevity applications.',
      benefits: ['Mitochondrial Health', 'Metabolism', 'Longevity Research'],
      detailedDescription: 'MOTS-c (Mitochondrial Open Reading Frame of the 12S rRNA-c) is a mitochondrial-derived peptide that has gained significant attention in aging and metabolic research. This 16-amino acid peptide is encoded by the mitochondrial genome and has been studied for its potential role in cellular metabolism, insulin sensitivity, and longevity pathways.',
      specifications: {
        purity: 'Purity Guaranteed',
        concentration: '10mg per vial',
        vialSize: '3ml',
        storage: 'Store at -20°C'
      },
      researchApplications: [
        'Mitochondrial function studies',
        'Metabolic pathway research',
        'Aging and longevity research',
        'Insulin sensitivity studies',
        'Exercise metabolism research'
      ],
      safetyInfo: 'All products sold by Legacy Peptides are intended strictly for laboratory research and analytical purposes. These materials are not intended for human or animal use, and are not approved for any therapeutic, diagnostic, or medical application. Legacy Peptides does not provide instructions or guidance regarding preparation, reconstitution, administration, or dosage. No product sold is classified as a drug, dietary supplement, or medical device under federal law. All items are labeled "For Research Use Only – Not for Human or Animal Use" in accordance with 21 CFR 809.10(c). Any misuse or unauthorized application is strictly prohibited and may violate applicable laws.'
    },
    {
      id: '9',
      name: 'NAD+',
      category: 'Anti-Aging',
      price: '$69.95',
      rating: 4.9,
      reviews: 187,
      image: 'NAD+.png',
      description: 'Essential coenzyme studied for cellular energy and anti-aging research applications.',
      benefits: ['Cellular Energy', 'DNA Repair', 'Anti-Aging'],
      detailedDescription: 'NAD+ (Nicotinamide Adenine Dinucleotide) is a crucial coenzyme found in all living cells and is essential for cellular energy production and DNA repair mechanisms. Research has shown its importance in aging processes, metabolic function, and cellular health. NAD+ levels naturally decline with age, making it a key focus in longevity research.',
      specifications: {
        purity: 'Purity Guaranteed',
        concentration: '500mg per vial',
        vialSize: '3ml',
        storage: 'Store at -20°C'
      },
      researchApplications: [
        'Cellular energy metabolism studies',
        'DNA repair mechanism research',
        'Aging and longevity studies',
        'Neurological research applications',
        'Metabolic pathway investigations'
      ],
      safetyInfo: 'All products sold by Legacy Peptides are intended strictly for laboratory research and analytical purposes. These materials are not intended for human or animal use, and are not approved for any therapeutic, diagnostic, or medical application. Legacy Peptides does not provide instructions or guidance regarding preparation, reconstitution, administration, or dosage. No product sold is classified as a drug, dietary supplement, or medical device under federal law. All items are labeled "For Research Use Only – Not for Human or Animal Use" in accordance with 21 CFR 809.10(c). Any misuse or unauthorized application is strictly prohibited and may violate applicable laws.'
    },
    {
      id: '10',
      name: 'TESAMORELIN',
      category: 'Growth Hormone',
      safeCode: 'HL-TESA10',
      price: '$79.95',
      rating: 4.6,
      reviews: 134,
      image: 'TESAMORELIN.png',
      description: 'Growth hormone releasing hormone analog studied for metabolic research.',
      benefits: ['GHRH Analog', 'Metabolic Research', 'Body Composition'],
      detailedDescription: 'Tesamorelin is a synthetic analog of growth hormone-releasing hormone (GHRH) that has been extensively studied for its effects on growth hormone secretion and metabolic parameters. This 44-amino acid peptide has been researched for its potential applications in metabolic disorders and body composition studies.',
      specifications: {
        purity: 'Purity Guaranteed',
        concentration: '10mg per vial',
        vialSize: '3ml',
        storage: 'Store at -20°C'
      },
      researchApplications: [
        'Growth hormone release studies',
        'Metabolic disorder research',
        'Body composition investigations',
        'Lipid metabolism studies',
        'Aging-related research'
      ],
      safetyInfo: 'All products sold by Legacy Peptides are intended strictly for laboratory research and analytical purposes. These materials are not intended for human or animal use, and are not approved for any therapeutic, diagnostic, or medical application. Legacy Peptides does not provide instructions or guidance regarding preparation, reconstitution, administration, or dosage. No product sold is classified as a drug, dietary supplement, or medical device under federal law. All items are labeled "For Research Use Only – Not for Human or Animal Use" in accordance with 21 CFR 809.10(c). Any misuse or unauthorized application is strictly prohibited and may violate applicable laws.'
    },
    {
      id: '11',
      name: 'THYMOSIN ALPHA-1',
      category: 'Immune Support',
      safeCode: 'HL-THY10',
      price: '$89.95',
      rating: 4.8,
      reviews: 156,
      image: 'THYMOSIN ALPHA-1.png',
      description: 'Immune system peptide studied for immune function and response research.',
      benefits: ['Immune Function', 'T-Cell Research', 'Immunomodulation'],
      detailedDescription: 'Thymosin Alpha-1 is a naturally occurring peptide that plays a crucial role in immune system function. This 28-amino acid peptide has been extensively studied for its immunomodulatory properties and its ability to enhance T-cell function. Research has focused on its potential applications in immune system disorders and immune response enhancement.',
      specifications: {
        purity: 'Purity Guaranteed',
        concentration: '10mg per vial',
        vialSize: '3ml',
        storage: 'Store at -20°C'
      },
      researchApplications: [
        'Immune system function studies',
        'T-cell activation research',
        'Immunomodulation investigations',
        'Vaccine response studies',
        'Autoimmune disorder research'
      ],
      safetyInfo: 'All products sold by Legacy Peptides are intended strictly for laboratory research and analytical purposes. These materials are not intended for human or animal use, and are not approved for any therapeutic, diagnostic, or medical application. Legacy Peptides does not provide instructions or guidance regarding preparation, reconstitution, administration, or dosage. No product sold is classified as a drug, dietary supplement, or medical device under federal law. All items are labeled "For Research Use Only – Not for Human or Animal Use" in accordance with 21 CFR 809.10(c). Any misuse or unauthorized application is strictly prohibited and may violate applicable laws.'
    },
    {
      id: '12',
      name: 'CJC-1295 / IPAMORELIN',
      category: 'Growth Hormone',
      safeCode: 'HL-CJC-IPA5',
      price: '$79.95',
      rating: 4.9,
      reviews: 203,
      image: 'CJC-1295IPAMORELINE 5MG.png',
      description: 'Synergistic combination studied for enhanced growth hormone release research.',
      benefits: ['GH Release', 'Synergistic Effect', 'Extended Half-Life'],
      detailedDescription: 'This combination brings together CJC-1295, a growth hormone releasing hormone analog with an extended half-life, and Ipamorelin, a selective growth hormone secretagogue. Together, they create a synergistic effect for sustained growth hormone release, making this combination highly valuable for growth hormone research applications.',
      specifications: {
        purity: 'Purity Guaranteed',
        concentration: '5mg CJC-1295 + 5mg Ipamorelin per vial',
        vialSize: '3ml',
        storage: 'Store at -20°C'
      },
      researchApplications: [
        'Sustained growth hormone release studies',
        'Synergistic peptide research',
        'Metabolic enhancement investigations',
        'Recovery mechanism studies',
        'Body composition research'
      ],
      safetyInfo: 'All products sold by Legacy Peptides are intended strictly for laboratory research and analytical purposes. These materials are not intended for human or animal use, and are not approved for any therapeutic, diagnostic, or medical application. Legacy Peptides does not provide instructions or guidance regarding preparation, reconstitution, administration, or dosage. No product sold is classified as a drug, dietary supplement, or medical device under federal law. All items are labeled "For Research Use Only – Not for Human or Animal Use" in accordance with 21 CFR 809.10(c). Any misuse or unauthorized application is strictly prohibited and may violate applicable laws.'
    },
    {
      id: '13',
      name: 'DSIP',
      category: 'Sleep Research',
      price: '$34.95',
      rating: 4.5,
      reviews: 87,
      image: 'DSIP 5MG.png',
      description: 'Delta sleep-inducing peptide studied for sleep and circadian rhythm research.',
      benefits: ['Sleep Research', 'Circadian Rhythm', 'Neuropeptide'],
      detailedDescription: 'DSIP (Delta Sleep-Inducing Peptide) is a naturally occurring neuropeptide that has been studied for its role in sleep regulation and circadian rhythm control. This nonapeptide has been researched for its potential effects on sleep patterns, stress response, and neuroendocrine function.',
      specifications: {
        purity: 'Purity Guaranteed',
        concentration: '5mg per vial',
        vialSize: '3ml',
        storage: 'Store at -20°C'
      },
      researchApplications: [
        'Sleep pattern research',
        'Circadian rhythm studies',
        'Stress response investigations',
        'Neuroendocrine research',
        'Sleep disorder studies'
      ],
      safetyInfo: 'All products sold by Legacy Peptides are intended strictly for laboratory research and analytical purposes. These materials are not intended for human or animal use, and are not approved for any therapeutic, diagnostic, or medical application. Legacy Peptides does not provide instructions or guidance regarding preparation, reconstitution, administration, or dosage. No product sold is classified as a drug, dietary supplement, or medical device under federal law. All items are labeled "For Research Use Only – Not for Human or Animal Use" in accordance with 21 CFR 809.10(c). Any misuse or unauthorized application is strictly prohibited and may violate applicable laws.'
    },
    {
      id: '14',
      name: 'EPITALON',
      category: 'Anti-Aging',
      safeCode: 'HL-EPI10',
      price: '$34.95',
      rating: 4.7,
      reviews: 142,
      image: 'EPITALON 10MG.png',
      description: 'Telomerase activator peptide studied for longevity and anti-aging research.',
      benefits: ['Telomerase Activation', 'Longevity Research', 'Anti-Aging'],
      detailedDescription: 'Epitalon is a synthetic tetrapeptide that has been extensively studied for its potential anti-aging properties. Research has focused on its ability to activate telomerase, an enzyme responsible for maintaining telomere length, which is associated with cellular aging and longevity.',
      specifications: {
        purity: 'Purity Guaranteed',
        concentration: '10mg per vial',
        vialSize: '3ml',
        storage: 'Store at -20°C'
      },
      researchApplications: [
        'Telomerase activation studies',
        'Cellular aging research',
        'Longevity mechanism investigations',
        'DNA repair studies',
        'Age-related disease research'
      ],
      safetyInfo: 'All products sold by Legacy Peptides are intended strictly for laboratory research and analytical purposes. These materials are not intended for human or animal use, and are not approved for any therapeutic, diagnostic, or medical application. Legacy Peptides does not provide instructions or guidance regarding preparation, reconstitution, administration, or dosage. No product sold is classified as a drug, dietary supplement, or medical device under federal law. All items are labeled "For Research Use Only – Not for Human or Animal Use" in accordance with 21 CFR 809.10(c). Any misuse or unauthorized application is strictly prohibited and may violate applicable laws.'
    },
    {
      id: '15',
      name: 'KISSPEPTIN',
      category: 'Reproductive Research',
      price: '$59.95',
      rating: 4.6,
      reviews: 78,
      image: 'KISSPEPTIN 10MG.png',
      description: 'Neuropeptide studied for reproductive hormone regulation research.',
      benefits: ['Hormone Regulation', 'Reproductive Research', 'Neuroendocrine'],
      detailedDescription: 'Kisspeptin is a neuropeptide that plays a crucial role in reproductive hormone regulation. This peptide has been extensively studied for its effects on gonadotropin-releasing hormone (GnRH) secretion and its role in puberty, fertility, and reproductive function.',
      specifications: {
        purity: 'Purity Guaranteed',
        concentration: '10mg per vial',
        vialSize: '3ml',
        storage: 'Store at -20°C'
      },
      researchApplications: [
        'Reproductive hormone studies',
        'GnRH regulation research',
        'Fertility mechanism investigations',
        'Puberty research',
        'Neuroendocrine studies'
      ],
      safetyInfo: 'All products sold by Legacy Peptides are intended strictly for laboratory research and analytical purposes. These materials are not intended for human or animal use, and are not approved for any therapeutic, diagnostic, or medical application. Legacy Peptides does not provide instructions or guidance regarding preparation, reconstitution, administration, or dosage. No product sold is classified as a drug, dietary supplement, or medical device under federal law. All items are labeled "For Research Use Only – Not for Human or Animal Use" in accordance with 21 CFR 809.10(c). Any misuse or unauthorized application is strictly prohibited and may violate applicable laws.'
    },
    {
      id: '16',
      name: 'MELANOTAN 1',
      category: 'Research',
      safeCode: 'HL-MEL1-10',
      price: '$34.95',
      rating: 4.4,
      reviews: 95,
      image: 'MELANOTAN 1 10MG.png',
      description: 'Melanocortin receptor agonist studied for pigmentation research.',
      benefits: ['Melanocortin Research', 'Pigmentation', 'Receptor Studies'],
      detailedDescription: 'Melanotan 1 is a synthetic analog of alpha-melanocyte stimulating hormone (α-MSH) that has been studied for its effects on melanocortin receptors. Research has focused on its role in pigmentation, appetite regulation, and sexual function through melanocortin receptor activation.',
      specifications: {
        purity: 'Purity Guaranteed',
        concentration: '10mg per vial',
        vialSize: '3ml',
        storage: 'Store at -20°C'
      },
      researchApplications: [
        'Melanocortin receptor research',
        'Pigmentation mechanism studies',
        'Appetite regulation investigations',
        'Sexual function research',
        'Hormone receptor studies'
      ],
      safetyInfo: 'All products sold by Legacy Peptides are intended strictly for laboratory research and analytical purposes. These materials are not intended for human or animal use, and are not approved for any therapeutic, diagnostic, or medical application. Legacy Peptides does not provide instructions or guidance regarding preparation, reconstitution, administration, or dosage. No product sold is classified as a drug, dietary supplement, or medical device under federal law. All items are labeled "For Research Use Only – Not for Human or Animal Use" in accordance with 21 CFR 809.10(c). Any misuse or unauthorized application is strictly prohibited and may violate applicable laws.'
    },
    {
      id: '17',
      name: 'MELANOTAN 2',
      category: 'Research',
      safeCode: 'HL-MEL2-10',
      price: '$38.95',
      rating: 4.5,
      reviews: 118,
      image: 'MELANOTAN 2 10MG.png',
      description: 'Melanocortin receptor agonist studied for multiple physiological effects.',
      benefits: ['Melanocortin Research', 'Multi-Target', 'Receptor Studies'],
      detailedDescription: 'Melanotan 2 is a synthetic analog of alpha-melanocyte stimulating hormone with broader receptor activity compared to Melanotan 1. Research has investigated its effects on multiple melanocortin receptors and its potential applications in various physiological studies.',
      specifications: {
        purity: 'Purity Guaranteed',
        concentration: '10mg per vial',
        vialSize: '3ml',
        storage: 'Store at -20°C'
      },
      researchApplications: [
        'Multi-receptor melanocortin studies',
        'Comparative receptor research',
        'Physiological response investigations',
        'Hormone analog studies',
        'Receptor selectivity research'
      ],
      safetyInfo: 'All products sold by Legacy Peptides are intended strictly for laboratory research and analytical purposes. These materials are not intended for human or animal use, and are not approved for any therapeutic, diagnostic, or medical application. Legacy Peptides does not provide instructions or guidance regarding preparation, reconstitution, administration, or dosage. No product sold is classified as a drug, dietary supplement, or medical device under federal law. All items are labeled "For Research Use Only – Not for Human or Animal Use" in accordance with 21 CFR 809.10(c). Any misuse or unauthorized application is strictly prohibited and may violate applicable laws.'
    },
    {
      id: '18',
      name: 'PT-141',
      category: 'Research',
      safeCode: 'HL-PT141-10',
      price: '$49.95',
      rating: 4.7,
      reviews: 134,
      image: 'PT-141 10MG.png',
      description: 'Melanocortin receptor agonist studied for sexual function research.',
      benefits: ['Sexual Function', 'Melanocortin Research', 'CNS Effects'],
      detailedDescription: 'PT-141 (Bremelanotide) is a synthetic peptide analog of alpha-melanocyte stimulating hormone that has been extensively studied for its effects on sexual function through central nervous system melanocortin receptor activation. Research has focused on its unique mechanism of action compared to other compounds.',
      specifications: {
        purity: 'Purity Guaranteed',
        concentration: '10mg per vial',
        vialSize: '3ml',
        storage: 'Store at -20°C'
      },
      researchApplications: [
        'Sexual function research',
        'CNS melanocortin studies',
        'Receptor activation investigations',
        'Behavioral research applications',
        'Neuroendocrine studies'
      ],
      safetyInfo: 'All products sold by Legacy Peptides are intended strictly for laboratory research and analytical purposes. These materials are not intended for human or animal use, and are not approved for any therapeutic, diagnostic, or medical application. Legacy Peptides does not provide instructions or guidance regarding preparation, reconstitution, administration, or dosage. No product sold is classified as a drug, dietary supplement, or medical device under federal law. All items are labeled "For Research Use Only – Not for Human or Animal Use" in accordance with 21 CFR 809.10(c). Any misuse or unauthorized application is strictly prohibited and may violate applicable laws.'
    },
    {
      id: '19',
      name: 'SELANK',
      category: 'Nootropic Research',
      safeCode: 'HL-SEL5',
      price: '$39.95',
      rating: 4.6,
      reviews: 89,
      image: 'SELANK 5MG.png',
      description: 'Anxiolytic peptide studied for cognitive and stress response research.',
      benefits: ['Cognitive Research', 'Stress Response', 'Anxiolytic'],
      detailedDescription: 'Selank is a synthetic heptapeptide derived from tuftsin that has been studied for its anxiolytic and cognitive-enhancing properties. Research has investigated its effects on stress response, memory formation, and cognitive function through various neurotransmitter systems.',
      specifications: {
        purity: 'Purity Guaranteed',
        concentration: '5mg per vial',
        vialSize: '3ml',
        storage: 'Store at -20°C'
      },
      researchApplications: [
        'Cognitive enhancement studies',
        'Stress response research',
        'Anxiolytic mechanism investigations',
        'Memory formation studies',
        'Neurotransmitter research'
      ],
      safetyInfo: 'All products sold by Legacy Peptides are intended strictly for laboratory research and analytical purposes. These materials are not intended for human or animal use, and are not approved for any therapeutic, diagnostic, or medical application. Legacy Peptides does not provide instructions or guidance regarding preparation, reconstitution, administration, or dosage. No product sold is classified as a drug, dietary supplement, or medical device under federal law. All items are labeled "For Research Use Only – Not for Human or Animal Use" in accordance with 21 CFR 809.10(c). Any misuse or unauthorized application is strictly prohibited and may violate applicable laws.'
    },
    {
      id: '20',
      name: 'SEMAX',
      category: 'Nootropic Research',
      safeCode: 'HL-SEMAX5',
      price: '$39.95',
      rating: 4.8,
      reviews: 167,
      image: 'SEMAX 5MG.png',
      description: 'Neuroprotective peptide studied for cognitive enhancement research.',
      benefits: ['Neuroprotection', 'Cognitive Enhancement', 'BDNF'],
      detailedDescription: 'Semax is a synthetic heptapeptide derived from ACTH that has been extensively studied for its neuroprotective and cognitive-enhancing properties. Research has focused on its ability to increase BDNF (Brain-Derived Neurotrophic Factor) and its effects on neuroplasticity and cognitive function.',
      specifications: {
        purity: 'Purity Guaranteed',
        concentration: '5mg per vial',
        vialSize: '3ml',
        storage: 'Store at -20°C'
      },
      researchApplications: [
        'Neuroprotection studies',
        'Cognitive enhancement research',
        'BDNF regulation investigations',
        'Neuroplasticity studies',
        'Memory and learning research'
      ],
      safetyInfo: 'All products sold by Legacy Peptides are intended strictly for laboratory research and analytical purposes. These materials are not intended for human or animal use, and are not approved for any therapeutic, diagnostic, or medical application. Legacy Peptides does not provide instructions or guidance regarding preparation, reconstitution, administration, or dosage. No product sold is classified as a drug, dietary supplement, or medical device under federal law. All items are labeled "For Research Use Only – Not for Human or Animal Use" in accordance with 21 CFR 809.10(c). Any misuse or unauthorized application is strictly prohibited and may violate applicable laws.'
    },
    {
      id: '21',
      name: 'SERMORELIN',
      category: 'Growth Hormone',
      safeCode: 'HL-SER10',
      price: '$44.95',
      rating: 4.7,
      reviews: 145,
      image: 'SERMORELIN 10MG.png',
      description: 'Growth hormone releasing hormone studied for GH secretion research.',
      benefits: ['GHRH', 'Natural GH Release', 'Pituitary Research'],
      detailedDescription: 'Sermorelin is a synthetic analog of growth hormone-releasing hormone (GHRH) consisting of the first 29 amino acids of the native hormone. Research has focused on its ability to stimulate natural growth hormone release from the pituitary gland and its applications in growth hormone deficiency studies.',
      specifications: {
        purity: 'Purity Guaranteed',
        concentration: '10mg per vial',
        vialSize: '3ml',
        storage: 'Store at -20°C'
      },
      researchApplications: [
        'Growth hormone release studies',
        'Pituitary function research',
        'Age-related GH decline investigations',
        'Natural hormone regulation studies',
        'Endocrine system research'
      ],
      safetyInfo: 'All products sold by Legacy Peptides are intended strictly for laboratory research and analytical purposes. These materials are not intended for human or animal use, and are not approved for any therapeutic, diagnostic, or medical application. Legacy Peptides does not provide instructions or guidance regarding preparation, reconstitution, administration, or dosage. No product sold is classified as a drug, dietary supplement, or medical device under federal law. All items are labeled "For Research Use Only – Not for Human or Animal Use" in accordance with 21 CFR 809.10(c). Any misuse or unauthorized application is strictly prohibited and may violate applicable laws.'
    },
    {
      id: '22',
      name: 'SLU-PP-332',
      category: 'Metabolic',
      safeCode: 'HL-SLU5',
      price: '$79.95',
      rating: 4.8,
      reviews: 76,
      image: 'SLU-PP-332 5MG.png',
      description: 'Novel metabolic peptide studied for weight management research.',
      benefits: ['Weight Management', 'Metabolic Research', 'Novel Compound'],
      detailedDescription: 'SLU-PP-332 is a novel peptide that has gained attention in metabolic research for its potential effects on weight management and metabolic function. This compound represents cutting-edge research in metabolic peptides and has been studied for its unique mechanisms of action.',
      specifications: {
        purity: 'Purity Guaranteed',
        concentration: '5mg per vial',
        vialSize: '3ml',
        storage: 'Store at -20°C'
      },
      researchApplications: [
        'Weight management research',
        'Metabolic pathway studies',
        'Novel peptide mechanism investigations',
        'Body composition research',
        'Energy expenditure studies'
      ],
      safetyInfo: 'All products sold by Legacy Peptides are intended strictly for laboratory research and analytical purposes. These materials are not intended for human or animal use, and are not approved for any therapeutic, diagnostic, or medical application. Legacy Peptides does not provide instructions or guidance regarding preparation, reconstitution, administration, or dosage. No product sold is classified as a drug, dietary supplement, or medical device under federal law. All items are labeled "For Research Use Only – Not for Human or Animal Use" in accordance with 21 CFR 809.10(c). Any misuse or unauthorized application is strictly prohibited and may violate applicable laws.'
    },
    {
      id: '23',
      name: 'SS-31',
      category: 'Mitochondrial',
      safeCode: 'HL-SS31-10',
      price: '$64.95',
      rating: 4.9,
      reviews: 98,
      image: 'SS-31 10MG.png',
      description: 'Mitochondrial-targeted peptide studied for cellular protection research.',
      benefits: ['Mitochondrial Protection', 'Cellular Health', 'Antioxidant'],
      detailedDescription: 'SS-31 (Elamipretide) is a mitochondrial-targeted tetrapeptide that has been extensively studied for its ability to protect mitochondrial function and reduce oxidative stress. Research has focused on its potential applications in age-related mitochondrial dysfunction and cellular protection.',
      specifications: {
        purity: 'Purity Guaranteed',
        concentration: '10mg per vial',
        vialSize: '3ml',
        storage: 'Store at -20°C'
      },
      researchApplications: [
        'Mitochondrial protection studies',
        'Oxidative stress research',
        'Cellular aging investigations',
        'Cardioprotection studies',
        'Neuroprotection research'
      ],
      safetyInfo: 'All products sold by Legacy Peptides are intended strictly for laboratory research and analytical purposes. These materials are not intended for human or animal use, and are not approved for any therapeutic, diagnostic, or medical application. Legacy Peptides does not provide instructions or guidance regarding preparation, reconstitution, administration, or dosage. No product sold is classified as a drug, dietary supplement, or medical device under federal law. All items are labeled "For Research Use Only – Not for Human or Animal Use" in accordance with 21 CFR 809.10(c). Any misuse or unauthorized application is strictly prohibited and may violate applicable laws.'
    },
    {
      id: '24',
      name: 'TB-500',
      category: 'Recovery',
      safeCode: 'HL-TB10',
      price: '$79.95',
      rating: 4.8,
      reviews: 189,
      image: 'TB-500 10MG.png',
      description: 'Thymosin Beta-4 fragment studied for tissue repair and recovery research.',
      benefits: ['Tissue Repair', 'Recovery', 'Angiogenesis'],
      detailedDescription: 'TB-500 is a synthetic version of Thymosin Beta-4, a naturally occurring peptide that plays a crucial role in tissue repair and regeneration. Research has extensively studied its effects on wound healing, angiogenesis, and cellular migration, making it valuable for recovery and repair mechanism studies.',
      specifications: {
        purity: 'Purity Guaranteed',
        concentration: '10mg per vial',
        vialSize: '3ml',
        storage: 'Store at -20°C'
      },
      researchApplications: [
        'Tissue repair mechanism studies',
        'Wound healing research',
        'Angiogenesis investigations',
        'Cellular migration studies',
        'Recovery pathway research'
      ],
      safetyInfo: 'All products sold by Legacy Peptides are intended strictly for laboratory research and analytical purposes. These materials are not intended for human or animal use, and are not approved for any therapeutic, diagnostic, or medical application. Legacy Peptides does not provide instructions or guidance regarding preparation, reconstitution, administration, or dosage. No product sold is classified as a drug, dietary supplement, or medical device under federal law. All items are labeled "For Research Use Only – Not for Human or Animal Use" in accordance with 21 CFR 809.10(c). Any misuse or unauthorized application is strictly prohibited and may violate applicable laws.'
    },
    {
      id: '25',
      name: 'TESAMORELIN / IPAMORELIN',
      category: 'Growth Hormone',
      safeCode: 'HL-TESA-IPA5',
      price: '$89.95',
      rating: 4.7,
      reviews: 112,
      image: 'TESAMORELIN  IPAMORELIN 5MG.png',
      description: 'Synergistic combination studied for enhanced metabolic and GH research.',
      benefits: ['Metabolic Research', 'GH Release', 'Synergistic'],
      detailedDescription: 'This combination brings together Tesamorelin, a GHRH analog, and Ipamorelin, a selective growth hormone secretagogue, creating a synergistic approach to growth hormone research. The combination has been studied for enhanced metabolic effects and sustained growth hormone release.',
      specifications: {
        purity: 'Purity Guaranteed',
        concentration: '5mg Tesamorelin + 5mg Ipamorelin per vial',
        vialSize: '3ml',
        storage: 'Store at -20°C'
      },
      researchApplications: [
        'Synergistic GH release studies',
        'Metabolic enhancement research',
        'Body composition investigations',
        'Combined peptide therapy studies',
        'Lipid metabolism research'
      ],
      safetyInfo: 'All products sold by Legacy Peptides are intended strictly for laboratory research and analytical purposes. These materials are not intended for human or animal use, and are not approved for any therapeutic, diagnostic, or medical application. Legacy Peptides does not provide instructions or guidance regarding preparation, reconstitution, administration, or dosage. No product sold is classified as a drug, dietary supplement, or medical device under federal law. All items are labeled "For Research Use Only – Not for Human or Animal Use" in accordance with 21 CFR 809.10(c). Any misuse or unauthorized application is strictly prohibited and may violate applicable laws.'
    },
    {
      id: '26',
      name: 'GLP-1 (S)',
      category: 'Metabolic',
      price: 'Starting at $59.95',
      rating: 4.8,
      reviews: 156,
      image: 'GLP-1 (S).png',
      description: 'GLP-1 receptor agonist studied for metabolic and glucose regulation research.',
      benefits: ['Glucose Regulation', 'Weight Management', 'Metabolic Health'],
      detailedDescription: 'GLP-1 (Semaglutide) is a glucagon-like peptide-1 receptor agonist that has been extensively studied for its effects on glucose regulation and metabolic function. Research has focused on its mechanisms of action in glucose homeostasis, appetite regulation, and metabolic health.',
      specifications: {
        purity: 'Purity Guaranteed',
        concentration: '5mg, 10mg, or 15mg per vial',
        vialSize: '3ml',
        storage: 'Store at -20°C'
      },
      researchApplications: [
        'Glucose regulation studies',
        'Metabolic pathway research',
        'Appetite control investigations',
        'Diabetes research applications',
        'Weight management studies'
      ],
      safetyInfo: 'All products sold by Legacy Peptides are intended strictly for laboratory research and analytical purposes. These materials are not intended for human or animal use, and are not approved for any therapeutic, diagnostic, or medical application. Legacy Peptides does not provide instructions or guidance regarding preparation, reconstitution, administration, or dosage. No product sold is classified as a drug, dietary supplement, or medical device under federal law. All items are labeled "For Research Use Only – Not for Human or Animal Use" in accordance with 21 CFR 809.10(c). Any misuse or unauthorized application is strictly prohibited and may violate applicable laws.'
    },
    {
      id: '27',
      name: 'GLP-2 (T)',
      category: 'Metabolic',
      price: 'Starting at $59.95',
      rating: 4.7,
      reviews: 134,
      image: 'GLP-2 (T).png',
      description: 'GLP-1 receptor agonist studied for advanced metabolic research applications.',
      benefits: ['Advanced Metabolic', 'Research Grade', 'Multi-Target'],
      detailedDescription: 'GLP-2 (Tirzepatide) is a dual GIP/GLP-1 receptor agonist that has been studied for its enhanced metabolic effects compared to single-target compounds. Research has investigated its dual mechanism of action and potential advantages in metabolic studies.',
      specifications: {
        purity: 'Purity Guaranteed',
        concentration: '5mg, 10mg, or 15mg per vial',
        vialSize: '3ml',
        storage: 'Store at -20°C'
      },
      researchApplications: [
        'Dual receptor mechanism studies',
        'Advanced metabolic research',
        'Comparative efficacy investigations',
        'Multi-target pathway studies',
        'Enhanced metabolic effect research'
      ],
      safetyInfo: 'All products sold by Legacy Peptides are intended strictly for laboratory research and analytical purposes. These materials are not intended for human or animal use, and are not approved for any therapeutic, diagnostic, or medical application. Legacy Peptides does not provide instructions or guidance regarding preparation, reconstitution, administration, or dosage. No product sold is classified as a drug, dietary supplement, or medical device under federal law. All items are labeled "For Research Use Only – Not for Human or Animal Use" in accordance with 21 CFR 809.10(c). Any misuse or unauthorized application is strictly prohibited and may violate applicable laws.'
    },
    {
      id: '28',
      name: 'GLP-3 (RETA)',
      category: 'Metabolic',
      price: 'Starting at $59.95',
      rating: 4.9,
      reviews: 89,
      image: 'GLP-3 (RETA).png',
      description: 'Triple receptor agonist studied for comprehensive metabolic research.',
      benefits: ['Triple Receptor', 'Comprehensive', 'Next-Gen Research'],
      detailedDescription: 'GLP-3 (Retatrutide) is a triple receptor agonist targeting GLP-1, GIP, and glucagon receptors, representing the next generation of metabolic research compounds. Studies have investigated its comprehensive approach to metabolic regulation through multiple pathways.',
      specifications: {
        purity: 'Purity Guaranteed',
        concentration: '5mg or 10mg per vial',
        vialSize: '3ml',
        storage: 'Store at -20°C'
      },
      researchApplications: [
        'Triple receptor mechanism studies',
        'Comprehensive metabolic research',
        'Next-generation compound investigations',
        'Multi-pathway metabolic studies',
        'Advanced therapeutic research'
      ],
      safetyInfo: 'All products sold by Legacy Peptides are intended strictly for laboratory research and analytical purposes. These materials are not intended for human or animal use, and are not approved for any therapeutic, diagnostic, or medical application. Legacy Peptides does not provide instructions or guidance regarding preparation, reconstitution, administration, or dosage. No product sold is classified as a drug, dietary supplement, or medical device under federal law. All items are labeled "For Research Use Only – Not for Human or Animal Use" in accordance with 21 CFR 809.10(c). Any misuse or unauthorized application is strictly prohibited and may violate applicable laws.'
    },
    {
      id: '29',
      name: 'CAGRILINTIDE',
      category: 'Metabolic',
      price: 'Starting at $59.95',
      rating: 4.6,
      reviews: 67,
      image: 'Cagrilintide 5MG.png',
      description: 'Amylin receptor agonist studied for metabolic and appetite regulation research.',
      benefits: ['Amylin Receptor', 'Appetite Control', 'Metabolic Research'],
      detailedDescription: 'Cagrilintide is a long-acting amylin receptor agonist that has been studied for its effects on appetite regulation and metabolic function. Research has focused on its unique mechanism of action through amylin receptors and its potential applications in metabolic studies.',
      specifications: {
        purity: 'Purity Guaranteed',
        concentration: '5mg or 10mg per vial',
        vialSize: '3ml',
        storage: 'Store at -20°C'
      },
      researchApplications: [
        'Amylin receptor studies',
        'Appetite regulation research',
        'Metabolic pathway investigations',
        'Satiety mechanism studies',
        'Combination therapy research'
      ],
      safetyInfo: 'All products sold by Legacy Peptides are intended strictly for laboratory research and analytical purposes. These materials are not intended for human or animal use, and are not approved for any therapeutic, diagnostic, or medical application. Legacy Peptides does not provide instructions or guidance regarding preparation, reconstitution, administration, or dosage. No product sold is classified as a drug, dietary supplement, or medical device under federal law. All items are labeled "For Research Use Only – Not for Human or Animal Use" in accordance with 21 CFR 809.10(c). Any misuse or unauthorized application is strictly prohibited and may violate applicable laws.'
    },
    {
      id: '30',
      name: 'BACTERIOSTATIC WATER',
      category: 'Research Supplies',
      price: '$10.95',
      rating: 4.9,
      reviews: 156,
      image: 'BACTERIOSTATIC WATER 10ML.png',
      description: 'Sterile bacteriostatic water for injection, essential for peptide reconstitution and research applications.',
      benefits: ['Sterile & Safe', 'Essential for Research', 'Long Shelf Life', 'USP Grade'],
      detailedDescription: 'Bacteriostatic Water for Injection is a sterile, non-pyrogenic preparation of water for injection containing 0.9% benzyl alcohol as a bacteriostatic preservative. This solution is specifically designed for diluting or dissolving drugs for injection and is essential for peptide research applications. The bacteriostatic agent prevents the growth of most bacteria, making it safe for multiple withdrawals from a single vial.',
      specifications: {
        purity: 'Purity Guaranteed',
        concentration: 'USP Grade',
        vialSize: '10ml',
        storage: 'Store at room temperature (20°C to 25°C)'
      },
      researchApplications: [
        'Peptide reconstitution and dilution',
        'Injectable drug preparation',
        'Laboratory research applications',
        'Sterile solution preparation',
        'Multiple-dose vial applications'
      ],
      safetyInfo: 'This product is intended for research purposes only. Not for human consumption. Contains benzyl alcohol as preservative. Please consult with a healthcare professional before use.'
    }
  ];

  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mb-6">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg">
              <span className="text-2xl">🚚</span>
              <span>FREE SHIPPING ON ALL ORDERS</span>
              <span className="text-2xl">🚚</span>
            </div>
          </div>
          <div className="mb-4"></div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Premium Research <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-gold-500">Peptides</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our extensive catalog features the highest quality research peptides, all third-party tested for purity and potency.
          </p>
        </div>

        {/* Products Grid - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-12 text-gray-600">
              Loading products...
            </div>
          ) : products.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-600">
              No products available yet.
            </div>
          ) : (
            products.sort((a, b) => a.name.localeCompare(b.name)).map((product, index) => {
              const isSoldOut = soldOutProducts[product.id] || false;
              return (
                <div
                  key={index}
                  onClick={() => !isSoldOut && onProductSelect(product)}
                  className={`bg-white rounded-2xl shadow-xl border-2 border-gray-200 transition-all duration-300 relative ${
                    isSoldOut
                      ? 'opacity-75 cursor-not-allowed'
                      : 'hover:border-blue-300 hover:shadow-2xl transform hover:-translate-y-2 cursor-pointer'
                  } group`}
                >
              {/* Success Message */}
              {successMessages[product.id] && (
                <div className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in z-10">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} />
                    <div>
                      <p className="font-semibold text-sm">Success!</p>
                      <p className="text-xs">Added to cart</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Product Image */}
              <div className="relative overflow-hidden rounded-t-2xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-56 object-contain bg-gradient-to-br from-gray-50 to-blue-50 group-hover:scale-105 transition-transform duration-300 p-6"
                />
                {isSoldOut && (
                  <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                    <div className="bg-red-600 text-white px-8 py-3 rounded-lg font-bold text-2xl transform -rotate-12 shadow-xl border-4 border-white">
                      SOLD OUT
                    </div>
                  </div>
                )}
                <div className="absolute bottom-4 right-4">
                  <img
                    src="Untitled design (1).png"
                    alt="American Flag"
                   className="w-32 h-20 object-contain -mb-2"
                  />
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1 rounded-full text-xs font-bold flex flex-col items-center gap-1">
                    <span>USA COMPANY</span>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
                  <span className="text-xl font-bold text-blue-600">{product.price}</span>
                </div>

                <p className="text-gray-600 mb-3 text-sm">{product.description}</p>

                {/* Mg Strength Bubble */}
                <div className="mb-3">
                  <div className="flex flex-wrap gap-2">
                    {(() => {
                      switch (product.name) {
                        case 'GHK-CU':
                          return (
                            <>
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-600 text-white">50mg</span>
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-600 text-white">100mg</span>
                            </>
                          );
                        case '5-AMINO-1MQ':
                          return <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-600 text-white">10mg</span>;
                        case 'AOD-9604':
                          return <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-600 text-white">5mg</span>;
                        case 'BPC-157 / TB-500':
                          return <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-600 text-white">5mg / 5mg</span>;
                        case 'GLOW':
                          return <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-600 text-white">70mg</span>;
                        case 'BPC-157':
                          return <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-600 text-white">10mg</span>;
                        case 'IPAMORELIN':
                          return <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-600 text-white">10mg</span>;
                        case 'MOTS-C':
                          return <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-600 text-white">10mg</span>;
                        case 'NAD+':
                          return <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-600 text-white">500mg</span>;
                        case 'TESAMORELIN':
                          return <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-600 text-white">10mg</span>;
                        case 'THYMOSIN ALPHA-1':
                          return <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-600 text-white">10mg</span>;
                        case 'CJC-1295 / IPAMORELIN':
                          return <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-600 text-white">5mg / 5mg</span>;
                        case 'DSIP':
                          return <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-600 text-white">5mg</span>;
                        case 'EPITALON':
                          return <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-600 text-white">10mg</span>;
                        case 'KISSPEPTIN':
                          return <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-600 text-white">10mg</span>;
                        case 'MELANOTAN 1':
                          return <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-600 text-white">10mg</span>;
                        case 'MELANOTAN 2':
                          return <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-600 text-white">10mg</span>;
                        case 'PT-141':
                          return <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-600 text-white">10mg</span>;
                        case 'SELANK':
                          return <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-600 text-white">5mg</span>;
                        case 'SEMAX':
                          return <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-600 text-white">5mg</span>;
                        case 'SERMORELIN':
                          return <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-600 text-white">10mg</span>;
                        case 'SLU-PP-332':
                          return <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-600 text-white">5mg</span>;
                        case 'SS-31':
                          return <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-600 text-white">10mg</span>;
                        case 'TB-500':
                          return <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-600 text-white">10mg</span>;
                        case 'TESAMORELIN / IPAMORELIN':
                          return <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-600 text-white">5mg / 5mg</span>;
                        case 'GLP-1 (S)':
                          return (
                            <>
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-600 text-white">5mg</span>
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-600 text-white">10mg</span>
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-600 text-white">15mg</span>
                            </>
                          );
                        case 'GLP-2 (T)':
                          return (
                            <>
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-600 text-white">5mg</span>
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-600 text-white">10mg</span>
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-600 text-white">15mg</span>
                            </>
                          );
                        case 'GLP-3 (RETA)':
                          return (
                            <>
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-600 text-white">5mg</span>
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-600 text-white">10mg</span>
                            </>
                          );
                        case 'CAGRILINTIDE':
                          return (
                            <>
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-600 text-white">5mg</span>
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-600 text-white">10mg</span>
                            </>
                          );
                        case 'BACTERIOSTATIC WATER':
                          return <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-600 text-white">10ML</span>;
                        default:
                          return <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-600 text-white">10mg</span>;
                      }
                    })()}
                  </div>
                </div>

                {/* Benefits */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {product.benefits.map((benefit, i) => (
                      <span key={i} className="bg-gold-100 text-gold-800 px-2 py-1 rounded-full text-xs font-medium">
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};