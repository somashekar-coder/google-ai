import React, { useEffect, useState, useRef } from 'react';
import QRCode from 'qrcode';
import { useApp } from '../context/AppContext';
import { X, Printer, Download, Utensils, MapPin, Phone, MessageCircle } from 'lucide-react';

export const QRCodeModal: React.FC = () => {
  const { isQRModalOpen, setIsQRModalOpen, settings } = useApp();
  const [dataUrl, setDataUrl] = useState<string>('');
  const [svgString, setSvgString] = useState<string>('');
  const printAreaRef = useRef<HTMLDivElement>(null);

  const menuUrl = typeof window !== 'undefined' ? `${window.location.origin}/#menu` : 'https://shreyasgrand.menu';

  useEffect(() => {
    if (isQRModalOpen) {
      QRCode.toDataURL(menuUrl, {
        width: 380,
        margin: 2,
        color: {
          dark: '#1c1917',
          light: '#ffffff'
        }
      }).then(url => setDataUrl(url)).catch(err => console.error(err));

      QRCode.toString(menuUrl, {
        type: 'svg',
        margin: 2,
        color: {
          dark: '#1c1917',
          light: '#ffffff'
        }
      }).then(svg => setSvgString(svg)).catch(err => console.error(err));
    }
  }, [isQRModalOpen, menuUrl]);

  if (!isQRModalOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPNG = () => {
    if (!dataUrl) return;
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'taste_of_pulaos_shreyas_grand_qr_menu.png';
    a.click();
  };

  const handleDownloadSVG = () => {
    if (!svgString) return;
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'taste_of_pulaos_shreyas_grand_qr_menu.svg';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-stone-200 overflow-hidden my-8">
        {/* Modal Top Bar */}
        <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-stone-50 print:hidden">
          <div className="flex items-center gap-2">
            <Utensils className="w-5 h-5 text-amber-600" />
            <h3 className="font-serif font-bold text-stone-900 text-base">
              Printable QR Code Digital Menu
            </h3>
          </div>
          <button
            onClick={() => setIsQRModalOpen(false)}
            className="p-1.5 text-stone-500 hover:text-stone-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Print-Ready A4 Poster Container */}
        <div ref={printAreaRef} className="p-6 sm:p-8 bg-white text-center space-y-4">
          {/* Header Branding */}
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-amber-700 uppercase tracking-widest block">
              HOTEL &amp; RESTAURANT
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-900 leading-tight">
              TASTE OF Pulao&apos;s
            </h1>
            <p className="text-stone-700 font-serif text-lg font-semibold">
              Shreyas Grand
            </p>
          </div>

          <div className="py-2">
            <div className="inline-block p-4 bg-white rounded-2xl border-2 border-stone-900 shadow-md">
              {dataUrl ? (
                <img
                  src={dataUrl}
                  alt="Scan to Explore Our Menu"
                  className="w-52 h-52 sm:w-60 sm:h-60 mx-auto"
                />
              ) : (
                <div className="w-52 h-52 bg-stone-100 flex items-center justify-center text-xs text-stone-400">
                  Generating QR Code...
                </div>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="font-serif text-lg font-bold text-amber-900">
              Scan to Explore Our Digital Menu
            </h3>
            <p className="text-xs text-stone-600 max-w-xs mx-auto leading-relaxed">
              Browse 130+ authentic Andhra pulaos, dum biryanis, tandoori kebabs, and order instantly.
            </p>
          </div>

          {/* Business Details & Contacts */}
          <div className="pt-4 border-t border-stone-200 text-left text-xs space-y-2 bg-stone-50 p-4 rounded-xl">
            <div className="flex items-start gap-2 text-stone-700">
              <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span className="text-[11px] leading-snug">{settings.address}</span>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-stone-200 text-[11px]">
              <span className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp: {settings.primaryPhone}</span>
              </span>

              <span className="flex items-center gap-1.5 text-stone-700 font-medium">
                <Phone className="w-3.5 h-3.5 text-amber-600" />
                <span>Desk: {settings.secondaryPhone}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Modal Action Bar (Hidden when printing) */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex flex-wrap items-center justify-end gap-2.5 print:hidden">
          <button
            onClick={handleDownloadSVG}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-700 bg-white border border-stone-200 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download SVG</span>
          </button>

          <button
            onClick={handleDownloadPNG}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-700 bg-white border border-stone-200 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PNG</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print A4 Menu Standee</span>
          </button>
        </div>
      </div>
    </div>
  );
};
