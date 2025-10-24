import React from 'react';
import { useState } from 'react';
import { Shield, Award, Microscope } from 'lucide-react';

export const COASection: React.FC = () => {
  const [selectedCOA, setSelectedCOA] = useState<string | null>(null);

  const coas = [
    {
      id: '1',
      productName: '5-Amino-1MQ',
      strength: '10mg',
      purity: '98.70%',
      testDate: '2025-09-01',
      fileName: '5-Amino-1MQ 10mg.png'
    },
    {
      id: '2',
      productName: 'AOD-9604',
      strength: '5mg',
      purity: '99.35%',
      testDate: '2025-09-01',
      fileName: 'AOD-9604 5mg.png'
    },
    {
      id: '3',
      productName: 'BPC-157',
      strength: '10mg',
      purity: '98.93%',
      testDate: '2025-09-01',
      fileName: 'BPC-157 10mg.png'
    },
    {
      id: '4',
      productName: 'Cagrilintide',
      strength: '5mg',
      purity: '99.10%',
      testDate: '2025-09-01',
      fileName: 'Cagrilintide 5mg.png'
    },
    {
      id: '5',
      productName: 'Cagrilintide',
      strength: '10mg',
      purity: '99.03%',
      testDate: '2025-09-01',
      fileName: 'Cagrilintide 10mg.png'
    },
    {
      id: '6',
      productName: 'DSIP',
      strength: '5mg',
      purity: '99.35%',
      testDate: '2025-09-01',
      fileName: 'DSIP 5mg.png'
    },
    {
      id: '7',
      productName: 'Epitalon',
      strength: '10mg',
      purity: '98.4%',
      testDate: '2025-09-01',
      fileName: 'Epitalon 10mg.png'
    },
    {
      id: '8',
      productName: 'GHK-CU',
      strength: '50mg',
      purity: '99.4%',
      testDate: '2025-09-01',
      fileName: 'GHK-CU 50MG.png'
    },
    {
      id: '9',
      productName: 'GHK-CU',
      strength: '100mg',
      purity: '99.7%',
      testDate: '2025-09-01',
      fileName: 'GHK-CU 100MG.png'
    },
    {
      id: '10',
      productName: 'GLP-1 (S)',
      strength: '5mg',
      purity: '99.7%',
      testDate: '2025-09-01',
      fileName: 'GLP-1 (S) 5MG.png'
    },
    {
      id: '11',
      productName: 'GLP-1 (S)',
      strength: '10mg',
      purity: '99.7%',
      testDate: '2025-09-01',
      fileName: 'GLP-1 (S) 10MG copy.png'
    },
    {
      id: '12',
      productName: 'GLP-1 (S)',
      strength: '15mg',
      purity: '99.7%',
      testDate: '2025-09-01',
      fileName: 'GLP-1 (S) 15MG copy.png'
    },
    {
      id: '13',
      productName: 'GLP-2 (T)',
      strength: '5mg',
      purity: '98.7%',
      testDate: '2025-09-01',
      fileName: 'GLP-2 (T) 5MG copy.png'
    },
    {
      id: '14',
      productName: 'GLP-2 (T)',
      strength: '10mg',
      purity: '98.7%',
      testDate: '2025-09-01',
      fileName: 'GLP-2 (T) 10MG copy.png'
    },
    {
      id: '15',
      productName: 'GLP-2 (T)',
      strength: '15mg',
      purity: '98.7%',
      testDate: '2025-09-01',
      fileName: 'GLP-2 (T) 15MG copy.png'
    },
    {
      id: '16',
      productName: 'Ipamorelin',
      strength: '10mg',
      purity: '99.5%',
      testDate: '2025-09-01',
      fileName: 'Ipamorelin 10mg.png'
    },
    {
      id: '17',
      productName: 'GLP-3 (RETA)',
      strength: '5mg',
      purity: '99.6%',
      testDate: '2025-09-01',
      fileName: 'GLP-3 (R) 5MG.png'
    },
    {
      id: '18',
      productName: 'GLP-3 (RETA)',
      strength: '10mg',
      purity: '99.6%',
      testDate: '2025-09-01',
      fileName: 'GLP-3 (R) 10MG.png'
    }
  ];


  return (
    <section id="coas" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Certificates of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-gold-500">Analysis</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Every batch of our peptides undergoes rigorous third-party testing by Liquilabs in Phoenix, Arizona. 
            View and download our certificates of analysis to verify the purity and quality of our products.
          </p>
          
          {/* Trust Badges */}
          <div className="flex justify-center items-center gap-8 mb-8">
            <div className="flex items-center gap-2">
              <Shield className="text-blue-600" size={24} />
              <span className="font-semibold text-gray-800">Third-Party Tested</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="text-gold-500" size={24} />
              <span className="font-semibold text-gray-800">Verified Purity</span>
            </div>
            <div className="flex items-center gap-2">
              <Microscope className="text-green-600" size={24} />
              <span className="font-semibold text-gray-800">Full Transparency</span>
            </div>
          </div>
        </div>

        {/* COA Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {coas.map((coa) => (
            <div key={coa.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">
                    {coa.productName}
                  </h3>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {coa.purity}
                  </span>
                </div>
                
                <div className="space-y-1 mb-4">
                  <p className="text-gray-600">
                    <span className="font-medium">Strength:</span> {coa.strength}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Test Date:</span> {new Date(coa.testDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Lab:</span> Liquilabs, Phoenix AZ
                  </p>
                </div>
              </div>
              
              {/* COA Image */}
              <div className="bg-gray-50 rounded-lg p-2">
                <img
                  src={`/coas/${coa.fileName}`}
                  alt={`COA for ${coa.productName}`}
                  className="w-full h-48 object-contain rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedCOA(`/coas/${coa.fileName}`)}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Lab Information */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Testing Laboratory</h3>
            <div className="flex justify-center items-center mb-6">
              <img 
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMjAwIDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8dGV4dCB4PSIxMCIgeT0iMzAiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiNFRjQ0NDQiPkxJUVVJTEFCUzwvdGV4dD4KPHRleHQgeD0iMTAiIHk9IjUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiNFRjQ0NDQiPkFuYWx5dGljYWwgc2VydmljZXM8L3RleHQ+Cjwvc3ZnPgo=" 
                alt="Liquilabs" 
                className="h-16"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Laboratory Details</h4>
                <p className="text-gray-600 mb-1"><strong>Name:</strong> Liquilabs s.r.o.</p>
                <p className="text-gray-600 mb-1"><strong>Location:</strong> Phoenix, Arizona</p>
                <p className="text-gray-600 mb-1"><strong>Website:</strong> www.liquilabs.com</p>
                <p className="text-gray-600"><strong>Certification:</strong> ISO/IEC 17025 Accredited</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Testing Standards</h4>
                <p className="text-gray-600 mb-1">• HPLC Purity Analysis</p>
                <p className="text-gray-600 mb-1">• Mass Spectrometry Confirmation</p>
                <p className="text-gray-600 mb-1">• Peptide Content Verification</p>
                <p className="text-gray-600">• Comprehensive Quality Control</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact for Custom COAs */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-blue-600 to-gold-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Need a Specific Batch COA?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Looking for a certificate of analysis for a specific batch? Contact us with your batch number 
              and we'll provide the corresponding COA within 24 hours.
            </p>
            <a 
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                if ((window as any).handleCOARequest) {
                  (window as any).handleCOARequest();
                }
              }}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl inline-block"
            >
              Request Batch COA
            </a>
          </div>
        </div>
      </div>

      {/* COA Image Modal */}
      {selectedCOA && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedCOA(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] overflow-auto">
            <img
              src={selectedCOA}
              alt="Certificate of Analysis"
              className="w-full h-auto rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setSelectedCOA(null)}
              className="absolute top-4 right-4 bg-white text-gray-800 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
};