/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // VIP 主题配色方案
        vip: {
          // 浅色模式
          light: {
            primary: colors.white[50],                 // 纯白背景
            secondary: colors.amber[50],           // 象牙白（带暖色调）
            accent: colors.amber[500],             // 黄金色
            highlight: colors.amber[400],           // 亮金色
            text: colors.gray[800],                // 深灰文字
            muted: colors.gray[400],               // 浅灰
            border: colors.amber[100],             // 浅金色边框
            
            // 多色系
            success: colors.emerald[500],          // 翡翠绿
            danger: colors.rose[500],              // 宝石红
            info: colors.sky[500],                 // 蓝宝石蓝
            warning: colors.amber[500],            // 琥珀橙
            premium: colors.purple[500],           // 紫水晶紫
            royal: colors.blue[600],               // 皇家蓝
            coral: colors.rose[400],               // 珊瑚红
            emerald: colors.emerald[500],          // 祖母绿
            sapphire: colors.blue[500],            // 蓝宝石
            amethyst: colors.purple[500]           // 紫水晶
          },
          // 深色模式
          dark: {
            primary: colors.gray[900],             // 纯黑背景
            secondary: colors.gray[800],           // 深灰
            accent: colors.amber[300],              // 亮金色
            highlight: colors.amber[400],           // 暗金色
            text: colors.gray[100],                 // 珍珠白文字
            muted: colors.gray[400],                // 银灰色
            border: colors.amber[600],              // 金色边框
            
            // 多色系
            success: colors.emerald[400],           // 宝石绿
            danger: colors.rose[500],               // 红宝石红
            info: colors.sky[400],                  // 深海蓝
            warning: colors.amber[400],             // 日落橙
            premium: colors.purple[500],            // 皇家紫
            royal: colors.blue[500],                // 皇家蓝
            coral: colors.rose[400],                // 珊瑚红
            emerald: colors.emerald[400],           // 祖母绿
            sapphire: colors.blue[400],             // 蓝宝石
            amethyst: colors.purple[500]            // 紫水晶
          },
        },
        
        // 贵金属渐变
        gradients: {
          gold: {
            0: colors.amber[500],                  // 黄金起始色
            1: colors.yellow[400]                  // 黄金结束色
          },
          platinum: {
            0: colors.gray[100],                   // 铂金起始色
            1: colors.gray[200]                     // 铂金结束色
          },
          diamond: {
            0: colors.sky[100],                     // 钻石蓝起始色
            1: colors.white                         // 钻石白结束色
          },
          emerald: {
            0: colors.emerald[400],                 // 祖母绿起始色
            1: colors.emerald[600]                  // 祖母绿结束色
          },
          ruby: {
            0: colors.rose[500],                    // 红宝石起始色
            1: colors.red[600]                     // 红宝石结束色
          },
          sapphire: {
            0: colors.blue[400],                   // 蓝宝石起始色
            1: colors.blue[600]                    // 蓝宝石结束色
          },
          amethyst: {
            0: colors.purple[500],                  // 紫水晶起始色
            1: colors.purple[700]                  // 紫水晶结束色
          }
        }
      },
      
      // 扩展渐变配置
      gradientColorStops: theme => ({
        ...theme('colors'),
        'gradient-gold-0': theme('colors.gradients.gold.0'),
        'gradient-gold-1': theme('colors.gradients.gold.1'),
        'gradient-platinum-0': theme('colors.gradients.platinum.0'),
        'gradient-platinum-1': theme('colors.gradients.platinum.1'),
        'gradient-diamond-0': theme('colors.gradients.diamond.0'),
        'gradient-diamond-1': theme('colors.gradients.diamond.1'),
        'gradient-emerald-0': theme('colors.gradients.emerald.0'),
        'gradient-emerald-1': theme('colors.gradients.emerald.1'),
        'gradient-ruby-0': theme('colors.gradients.ruby.0'),
        'gradient-ruby-1': theme('colors.gradients.ruby.1'),
        'gradient-sapphire-0': theme('colors.gradients.sapphire.0'),
        'gradient-sapphire-1': theme('colors.gradients.sapphire.1'),
        'gradient-amethyst-0': theme('colors.gradients.amethyst.0'),
        'gradient-amethyst-1': theme('colors.gradients.amethyst.1'),
      }),
    },
  },
  variants: {
    extend: {
      gradientColorStops: ['dark', 'hover', 'focus'],
    },
  },
  plugins: [
  ],
}