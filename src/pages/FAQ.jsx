import React, { useState, useEffect, useRef } from 'react';
import { Heart, Share2, Sparkles, Moon, Star, Sun, Flower, Wind } from 'lucide-react';

const PersianHadithSpiritualPage = () => {
  const [currentHadith, setCurrentHadith] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showShareCanvas, setShowShareCanvas] = useState(false);
  const [showWishButton, setShowWishButton] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [theme, setTheme] = useState('morning');
  const canvasRef = useRef(null);

  const hadithCollection = [
    {
      arabic: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ",
      persian: "اعمال به نیت بستگی دارد و هر کسی بر اساس نیتش پاداش می‌گیرد.",
      source: "امام علی (علیه السلام) - نهج البلاغه"
    },
    {
      arabic: "الْعِلْمُ نُورٌ",
      persian: "دانش نوری است که راه تاریکی را روشن می‌کند.",
      source: "امام صادق (علیه السلام) - اصول کافی"
    },
    {
      arabic: "الصَّبْرُ مِفْتَاحُ الْفَرَجِ",
      persian: "صبر کلید گشایش است و هر مشکلی پاسخی دارد.",
      source: "امام حسین (علیه السلام) - بحارالانوار"
    },
    {
      arabic: "حُسْنُ الْخُلُقِ خَيْرُ الْمُقْنِيَاتِ",
      persian: "خوش اخلاقی بهترین سرمایه انسان است.",
      source: "امام رضا (علیه السلام) - تحف العقول"
    },
    {
      arabic: "الْعَدْلُ أَسَاسُ الْمُلْكِ",
      persian: "عدالت پایه حکومت و زندگی است.",
      source: "امام علی (علیه السلام) - غررالحکم"
    },
    {
      arabic: "الْحِلْمُ سَيِّدُ الْأَخْلَاقِ",
      persian: "بردباری سرور اخلاق نیکوست.",
      source: "امام باقر (علیه السلام) - کشف الغمه"
    },
    {
      arabic: "الدُّنْيَا مَزْرَعَةُ الْآخِرَةِ",
      persian: "دنیا کشتزار آخرت است، آنچه بکاری همان را درو می‌کنی.",
      source: "امام زین العابدین (علیه السلام) - مصباح الشریعه"
    },
    {
      arabic: "لَا تَحْقِرَنَّ مِنَ الْمَعْرُوفِ شَيْئًا",
      persian: "هیچ کار خیری را کوچک نشمار، زیرا کوچکترین خیر نیز بزرگ است.",
      source: "امام کاظم (علیه السلام) - تحف العقول"
    },
    {
      arabic: "الْقَنَاعَةُ كَنْزٌ لَا يَفْنَى",
      persian: "قناعت گنجی است که هرگز تمام نمی‌شود.",
      source: "امام علی (علیه السلام) - نهج البلاغه"
    },
    {
      arabic: "مَنْ عَرَفَ نَفْسَهُ فَقَدْ عَرَفَ رَبَّهُ",
      persian: "هر کس خودش را بشناسد، پروردگارش را شناخته است.",
      source: "امام صادق (علیه السلام) - بحارالانوار"
    },
    {
      arabic: "الْحَيَاءُ مِنَ الْإِيمَانِ",
      persian: "حیا و شرم از ایمان است و نشانه قلب پاک.",
      source: "امام حسن (علیه السلام) - تحف العقول"
    },
    {
      arabic: "الْوَقْتُ أَثْمَنُ مِنَ الذَّهَبِ",
      persian: "وقت از طلا گرانبهاتر است، آن را هدر نده.",
      source: "امام جواد (علیه السلام) - نور الثقلین"
    },
    {
      arabic: "الْعَافِيَةُ تَاجُ عَلَى رُؤُوسِ الْأَصِحَّاءِ",
      persian: "سلامتی تاجی است بر سر سالمان که بیماران آن را می‌بینند.",
      source: "امام هادی (علیه السلام) - اعلام الدین"
    },
    {
      arabic: "الْأُمُّ مَدْرَسَةٌ",
      persian: "مادر مدرسه است، اگر او را آماده کنی قومی آماده کرده‌ای.",
      source: "امام حسن عسکری (علیه السلام) - تحف العقول"
    },
    {
      arabic: "الْعِبَادَةُ سَبْعُونَ جُزْءًا",
      persian: "عبادت هفتاد جزء دارد که بهترین آن کسب حلال است.",
      source: "امام علی (علیه السلام) - غررالحکم"
    },
    {
      arabic: "الْإِخْلَاصُ نِصْفُ الدِّينِ",
      persian: "اخلاص نیمی از دین است و بدون آن هیچ عملی پذیرفته نیست.",
      source: "امام صادق (علیه السلام) - کشف الغمه"
    },
    {
      arabic: "الْبِرُّ حُسْنُ الْخُلُقِ",
      persian: "نیکی همان خوش اخلاقی است که با همه باید داشت.",
      source: "امام رضا (علیه السلام) - عیون اخبار الرضا"
    },
    {
      arabic: "الْحِكْمَةُ ضَالَّةُ الْمُؤْمِنِ",
      persian: "حکمت گمشده مؤمن است، هر کجا یافت شایسته اوست.",
      source: "امام علی (علیه السلام) - نهج البلاغه"
    },
    {
      arabic: "الصِّدْقُ عِزٌّ",
      persian: "راستگویی عزت است و دروغ ذلت و خواری.",
      source: "امام باقر (علیه السلام) - اصول کافی"
    },
    {
      arabic: "الْجُودُ يُحَبِّبُ الرَّجُلَ إِلَى أَعْدَائِهِ",
      persian: "بخشندگی انسان را حتی نزد دشمنانش محبوب می‌کند.",
      source: "امام حسین (علیه السلام) - بحارالانوار"
    }
  ];

  const getTimeBasedTheme = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 11) return 'morning';
    if (hour >= 11 && hour < 17) return 'noon';
    if (hour >= 17 && hour < 21) return 'afternoon';
    return 'night';
  };

  const getThemeStyles = (currentTheme) => {
    const themes = {
      morning: {
        background: 'bg-gradient-to-br from-orange-300 via-pink-300 to-purple-300',
        card: 'bg-white/20',
        text: 'text-purple-900',
        subtext: 'text-purple-700',
        button: 'bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600',
        accent: 'text-orange-600'
      },
      noon: {
        background: 'bg-gradient-to-br from-yellow-200 via-orange-200 to-red-300',
        card: 'bg-white/25',
        text: 'text-red-900',
        subtext: 'text-red-700',
        button: 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600',
        accent: 'text-yellow-600'
      },
      afternoon: {
        background: 'bg-gradient-to-br from-orange-400 via-red-400 to-purple-500',
        card: 'bg-white/15',
        text: 'text-white',
        subtext: 'text-orange-100',
        button: 'bg-gradient-to-r from-red-400 to-purple-500 hover:from-red-500 hover:to-purple-600',
        accent: 'text-orange-300'
      },
      night: {
        background: 'bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900',
        card: 'bg-white/10',
        text: 'text-white',
        subtext: 'text-blue-100',
        button: 'bg-gradient-to-r from-indigo-400 to-purple-500 hover:from-indigo-500 hover:to-purple-600',
        accent: 'text-blue-300'
      }
    };
    return themes[currentTheme] || themes.morning;
  };

  const loadingTexts = [
    "در حال جستجو در گنجینه حکمت...",
    "امام علی (ع) می‌فرماید: صبر کلید گشایش است...",
    "در حال پیدا کردن پاسخ شما...",
    "حکمت ائمه (ع) راه شما را روشن می‌کند...",
    "پاسخ شما در کلمات نورانی یافت شد..."
  ];

  const handleWish = () => {
    setShowWishButton(false);
    setIsLoading(true);
    
    let textIndex = 0;
    const interval = setInterval(() => {
      setLoadingText(loadingTexts[textIndex]);
      textIndex = (textIndex + 1) % loadingTexts.length;
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      setIsLoading(false);
      getRandomHadith();
    }, 5000);
  };

  const getRandomHadith = () => {
    setIsAnimating(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * hadithCollection.length);
      setCurrentHadith(hadithCollection[randomIndex]);
      setIsAnimating(false);
    }, 500);
  };

  const generateShareImage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = 1080;
    canvas.height = 1920;
    
    // Green gradient background like original
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#064e3b'); // Dark green
    gradient.addColorStop(0.3, '#065f46'); // Medium green
    gradient.addColorStop(0.7, '#047857'); // Light green
    gradient.addColorStop(1, '#059669'); // Lighter green
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add Islamic pattern border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 8;
    ctx.strokeRect(60, 60, canvas.width - 120, canvas.height - 120);
    
    // Inner decorative border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 4;
    ctx.strokeRect(90, 90, canvas.width - 180, canvas.height - 180);
    
    // Fill bottom with flowers
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * canvas.width;
      const y = canvas.height - 300 + Math.random() * 200;
      const size = Math.random() * 20 + 15;
      
      // Flower petals
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`;
      for (let j = 0; j < 6; j++) {
        const angle = (j * Math.PI * 2) / 6;
        const petalX = x + Math.cos(angle) * size;
        const petalY = y + Math.sin(angle) * size;
        
        ctx.beginPath();
        ctx.arc(petalX, petalY, size * 0.3, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Flower center
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.4 + 0.2})`;
      ctx.beginPath();
      ctx.arc(x, y, size * 0.2, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Add stars at bottom
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * canvas.width;
      const y = canvas.height - 400 + Math.random() * 300;
      const size = Math.random() * 8 + 4;
      
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.4 + 0.2})`;
      
      // Draw star
      ctx.beginPath();
      for (let j = 0; j < 5; j++) {
        const angle = (j * Math.PI * 2) / 5 - Math.PI / 2;
        const x1 = x + Math.cos(angle) * size;
        const y1 = y + Math.sin(angle) * size;
        const x2 = x + Math.cos(angle + Math.PI / 5) * size * 0.5;
        const y2 = y + Math.sin(angle + Math.PI / 5) * size * 0.5;
        
        if (j === 0) {
          ctx.moveTo(x1, y1);
        } else {
          ctx.lineTo(x1, y1);
        }
        ctx.lineTo(x2, y2);
      }
      ctx.closePath();
      ctx.fill();
    }
    
    // Add sparkles throughout
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 4 + 2;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Add Persian text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 40px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    const persianText = currentHadith.persian;
    const maxWidth = canvas.width - 160;
    const words = persianText.split(' ');
    let lines = [];
    let currentLine = '';
    
    words.forEach(word => {
      const testLine = currentLine + word + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && currentLine !== '') {
        lines.push(currentLine);
        currentLine = word + ' ';
      } else {
        currentLine = testLine;
      }
    });
    lines.push(currentLine);
    
    const startY = canvas.height * 0.3;
    lines.forEach((line, index) => {
      ctx.fillText(line, canvas.width / 2, startY + (index * 60));
    });
    
    // Add Arabic text
    ctx.font = '32px Arial';
    ctx.fillStyle = '#e8f5e8';
    ctx.fillText(currentHadith.arabic, canvas.width / 2, canvas.height * 0.5);
    
    // Add source
    ctx.font = '28px Arial';
    ctx.fillStyle = '#a7f3d0';
    ctx.fillText(currentHadith.source, canvas.width / 2, canvas.height * 0.62);
    
    // Add decorative title
    ctx.font = 'bold 36px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('✨ حکمت نورانی ✨', canvas.width / 2, canvas.height * 0.15);
    
    return canvas.toDataURL();
  };

  const shareToInstagram = () => {
    setShowShareCanvas(true);
    setTimeout(() => {
      const dataURL = generateShareImage();
      const link = document.createElement('a');
      link.download = 'persian-hadith-wisdom.png';
      link.href = dataURL;
      link.click();
      setShowShareCanvas(false);
    }, 100);
  };

  useEffect(() => {
    setTheme(getTimeBasedTheme());
  }, []);

  const themeStyles = getThemeStyles(theme);

  return (
    <div className={`min-h-screen ${themeStyles.background} relative overflow-hidden`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            <Sparkles className={`${themeStyles.accent} opacity-30`} size={16} />
          </div>
        ))}
        
        {[...Array(10)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          >
            <Star className="text-yellow-200 opacity-40" size={12} />
          </div>
        ))}
      </div>

      {/* Floating Flowers at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={`flower-${i}`}
            className="absolute animate-float-up"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 100}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          >
            <Flower className={`${themeStyles.accent} opacity-60`} size={Math.random() * 16 + 12} />
          </div>
        ))}
        
        {[...Array(8)].map((_, i) => (
          <div
            key={`wind-${i}`}
            className="absolute animate-sway"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 80}px`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          >
            <Wind className={`${themeStyles.accent} opacity-40`} size={20} />
          </div>
        ))}
      </div>

      {/* Theme Icon */}
      <div className="absolute top-10 right-10 animate-bounce">
        {theme === 'morning' && <Sun className="text-orange-400 opacity-80" size={40} />}
        {theme === 'noon' && <Sun className="text-yellow-400 opacity-80" size={40} />}
        {theme === 'afternoon' && <Sun className="text-red-400 opacity-80" size={40} />}
        {theme === 'night' && <Moon className="text-blue-200 opacity-80" size={40} />}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className={`text-4xl md:text-6xl font-bold ${themeStyles.text} mb-4 drop-shadow-lg`}>
            ✨ حکمت نورانی ✨
          </h1>
          <p className={`text-xl ${themeStyles.subtext} font-light mb-8 max-w-2xl`}>
            آرزویت را در دل بگیر، از درون راهنمایی بجوی و بگذار حکمت اهل بیت (علیهم السلام) راهت را روشن کند
          </p>
        </div>

        {/* Wish Button */}
        {showWishButton && (
          <div className="text-center animate-fade-in">
            <button
              onClick={handleWish}
              className={`${themeStyles.button} text-white px-12 py-6 rounded-full font-bold text-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto`}
            >
              <Heart size={24} />
              آرزو کن و حکمت بگیر
              <Sparkles size={24} />
            </button>
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className={`${themeStyles.card} backdrop-blur-md rounded-3xl p-8 max-w-2xl mx-auto shadow-2xl border border-white/20 text-center`}>
            <div className="animate-spin text-4xl mb-4">✨</div>
            <p className={`text-lg ${themeStyles.text} animate-pulse`}>
              {loadingText}
            </p>
          </div>
        )}

        {/* Hadith Display */}
        {currentHadith && !isLoading && !showWishButton && (
          <div className={`${themeStyles.card} backdrop-blur-md rounded-3xl p-8 md:p-12 max-w-4xl mx-auto shadow-2xl border border-white/20 transition-all duration-500 ${
            isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}>
            <div className="text-center space-y-6">
              {/* Arabic Text */}
              <div className={`text-xl md:text-2xl font-bold ${themeStyles.text} mb-6 leading-relaxed`}>
                {currentHadith.arabic}
              </div>
              
              {/* Persian Translation */}
              <div className={`text-lg md:text-xl ${themeStyles.subtext} leading-relaxed`}>
                "{currentHadith.persian}"
              </div>
              
              {/* Source */}
              <div className={`${themeStyles.accent} text-sm md:text-base`}>
                — {currentHadith.source}
              </div>
              
              {/* Decorative Elements */}
              <div className="flex justify-center space-x-4 mt-8">
                <div className={`w-16 h-0.5 bg-gradient-to-r from-transparent via-current to-transparent ${themeStyles.accent}`}></div>
                <Heart className="text-pink-400" size={20} />
                <div className={`w-16 h-0.5 bg-gradient-to-r from-transparent via-current to-transparent ${themeStyles.accent}`}></div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {currentHadith && !isLoading && !showWishButton && (
          <div className="flex flex-col sm:flex-row gap-4 mt-12">
            <button
              onClick={getRandomHadith}
              className={`${themeStyles.button} text-white px-8 py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2`}
            >
              <Sparkles size={20} />
              حکمت جدید
            </button>
            
            <button
              onClick={shareToInstagram}
              className="bg-gradient-to-r from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600 text-white px-8 py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <Share2 size={20} />
              اشتراک در اینستاگرام
            </button>
          </div>
        )}
      </div>

      {/* Hidden Canvas for Instagram Story Generation */}
      <canvas
        ref={canvasRef}
        className={`${showShareCanvas ? 'block' : 'hidden'} fixed top-0 left-0 z-50`}
      />

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float-up {
          0% { transform: translateY(20px) rotate(0deg); opacity: 0.8; }
          50% { transform: translateY(-10px) rotate(180deg); opacity: 1; }
          100% { transform: translateY(-30px) rotate(360deg); opacity: 0.6; }
        }
        
        @keyframes sway {
          0%, 100% { transform: translateX(0px) rotate(0deg); }
          25% { transform: translateX(10px) rotate(5deg); }
          75% { transform: translateX(-10px) rotate(-5deg); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-up {
          animation: float-up 6s ease-in-out infinite;
        }
        
        .animate-sway {
          animation: sway 4s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default PersianHadithSpiritualPage;