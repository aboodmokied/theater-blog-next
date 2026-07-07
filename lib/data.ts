import type { FeaturedStory, VisionFeature, VisionTile } from "./types";

export const featuredStory: FeaturedStory = {
  id: "mohammed-ghloum-50-years",
  eyebrow: "الأستاذ محمد غلوم",
  titleLine1: "سيد المسرح الكويتي:",
  titleLine2: "خمسون عاماً من الإبداع",
  description:
    "رحلة عبر الزمن في تاريخ المسرح الخليجي، تستعرض أهم المحطات الفنية للفنان القدير محمد غلوم، من كواليس العصر الذهبي إلى منصات التتويج العالمية.",
  primaryCta: "التفاصيل",
  secondaryCta: "شاهد الآن",
};

export const visionFeatures: VisionFeature[] = [
  {
    id: "memory-preservation",
    icon: "archive",
    title: "حفظ الذاكرة المسرحية",
    description:
      "توثيق العروض النادرة وأعمال الكواليس التي لم يشاهدها الجمهور من قبل، ضماناً لاستمرارية الإبداع للأجيال القادمة.",
  },
  {
    id: "digital-academy",
    icon: "academy",
    title: "أكاديمية علوم الرقمية",
    description:
      "دروس احترافية لأداء المسرحي، الإخراج، وتطوير الشخصية الفنية بمنظور رائد المسرح الكويتي.",
  },
];

export const visionTiles: VisionTile[] = [
  {
    id: "lighting-philosophy",
    size: "small",
    title: "فلسفة الإضاءة",
    description: "كيف يطلق محمد غلوم العوالم النفسية بالضوء؟",
  },
  {
    id: "costumes-ornaments",
    size: "small",
    title: "الأزياء والزخرفة",
    description: "دلالات الثياب في المسرح التراثي الكويتي.",
  },
  {
    id: "behind-the-scenes",
    size: "large",
    badge: "بث مباشر",
    title: "خلف الكواليس: سر اللعبة المسرحية",
    description:
      'لقطات نادرة من تمارين مسرحية "تحليل الأول من نوعه" ونقاشات غلوم مع طاقم العمل.',
    cta: "مشاهدة الوثائقي",
  },
];
