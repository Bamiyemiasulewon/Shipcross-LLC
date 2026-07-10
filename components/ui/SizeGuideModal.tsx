'use client'

import { X } from 'lucide-react'

interface SizeGuideModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-serif font-bold">Size Guide</h2>
            <button onClick={onClose}>
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Tops & Dresses</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Size</th>
                      <th className="text-left py-2">Bust (cm)</th>
                      <th className="text-left py-2">Waist (cm)</th>
                      <th className="text-left py-2">Hips (cm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2">XS</td>
                      <td className="py-2">78-82</td>
                      <td className="py-2">60-64</td>
                      <td className="py-2">86-90</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">S</td>
                      <td className="py-2">83-87</td>
                      <td className="py-2">65-69</td>
                      <td className="py-2">91-95</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">M</td>
                      <td className="py-2">88-92</td>
                      <td className="py-2">70-74</td>
                      <td className="py-2">96-100</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">L</td>
                      <td className="py-2">93-97</td>
                      <td className="py-2">75-79</td>
                      <td className="py-2">101-105</td>
                    </tr>
                    <tr>
                      <td className="py-2">XL</td>
                      <td className="py-2">98-102</td>
                      <td className="py-2">80-84</td>
                      <td className="py-2">106-110</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Bottoms</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Size</th>
                      <th className="text-left py-2">Waist (cm)</th>
                      <th className="text-left py-2">Hips (cm)</th>
                      <th className="text-left py-2">Inseam (cm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2">XS</td>
                      <td className="py-2">60-64</td>
                      <td className="py-2">86-90</td>
                      <td className="py-2">76</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">S</td>
                      <td className="py-2">65-69</td>
                      <td className="py-2">91-95</td>
                      <td className="py-2">77</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">M</td>
                      <td className="py-2">70-74</td>
                      <td className="py-2">96-100</td>
                      <td className="py-2">78</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">L</td>
                      <td className="py-2">75-79</td>
                      <td className="py-2">101-105</td>
                      <td className="py-2">79</td>
                    </tr>
                    <tr>
                      <td className="py-2">XL</td>
                      <td className="py-2">80-84</td>
                      <td className="py-2">106-110</td>
                      <td className="py-2">80</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Shoes</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">EU Size</th>
                      <th className="text-left py-2">US Size</th>
                      <th className="text-left py-2">Foot Length (cm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2">36</td>
                      <td className="py-2">6</td>
                      <td className="py-2">23.5</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">37</td>
                      <td className="py-2">7</td>
                      <td className="py-2">24.2</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">38</td>
                      <td className="py-2">8</td>
                      <td className="py-2">24.8</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">39</td>
                      <td className="py-2">9</td>
                      <td className="py-2">25.5</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">40</td>
                      <td className="py-2">10</td>
                      <td className="py-2">26.2</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">41</td>
                      <td className="py-2">11</td>
                      <td className="py-2">26.8</td>
                    </tr>
                    <tr>
                      <td className="py-2">42</td>
                      <td className="py-2">12</td>
                      <td className="py-2">27.5</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="text-sm text-gray-600">
              <p className="mb-2">
                <strong>How to measure:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Bust: Measure around the fullest part of your bust</li>
                <li>Waist: Measure around your natural waistline</li>
                <li>Hips: Measure around the fullest part of your hips</li>
                <li>Foot Length: Measure from heel to toe</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}