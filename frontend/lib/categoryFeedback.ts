// Category Feedback Analysis Data - 基于产品类型分类的正负面反馈分析
// 数据来源: consolidated_aspect_categorization.json, expanded_review_results.json, 产品分类数据
// 生成时间: 2025-06-10 18:28:25
// 使用sentiment标记直接判断正负面

export interface CategoryFeedback {
  category: string;                 // 分类名称
  categoryType: 'Physical' | 'Performance'; // 分类类型
  mentions: number;                // 总提及次数
  satisfactionRate: number;        // 满意度百分比
  negativeRate: number;           // 负面评价比例
  positiveCount: number;          // 正面评价数
  negativeCount: number;          // 负面评价数
  totalReviews: number;           // 总评价数
  averageRating: number;          // 平均评分
  topNegativeAspects: string[];   // 主要负面aspect
  topPositiveAspects: string[];   // 主要正面aspect
}

export interface UseCaseFeedback {
  useCase: string;                    // 使用场景名称
  totalMentions: number;             // 总提及次数
  positiveCount: number;             // 正面评价数
  negativeCount: number;             // 负面评价数
  satisfactionRate: number;          // 满意度百分比
  categoryType: 'Physical' | 'Performance'; // 关联的主要分类类型
  topSatisfactionReasons: string[];  // 满意的原因
  topGapReasons: string[];          // 不满意的原因/产品缺口
  relatedCategories: string[];      // 相关的category分类
}

export interface CategoryFeedbackData {
  summary: {
    totalCategories: number;
    physicalCategories: number;
    performanceCategories: number;
    avgSatisfactionRate: number;
    processingDate: string;
    productType: string;
  };
  topNegativeCategories: CategoryFeedback[];  // Top 10 负面分类
  topPositiveCategories: CategoryFeedback[];  // Top 10 正面分类
  topUseCases: UseCaseFeedback[];             // Top 10 使用场景
  allCategories: CategoryFeedback[];          // 所有分类数据（按负面率排序）
}

export type ProductType = 'dimmer' | 'light';

// Dimmer Switches 数据
export const dimmerSwitchesSummary = {
  "totalCategories": 114,
  "physicalCategories": 113,
  "performanceCategories": 1,
  "avgSatisfactionRate": 50.2,
  "processingDate": "2025-06-10T18:28:25.613031",
  "productType": "Dimmer Switches"
};
export const topNegativeDimmerCategories: CategoryFeedback[] = [
  {
    "category": "Size and Fit",
    "categoryType": "Physical",
    "mentions": 105,
    "satisfactionRate": 44.7,
    "negativeRate": 55.3,
    "positiveCount": 55,
    "negativeCount": 68,
    "totalReviews": 123,
    "averageRating": 4.23,
    "topNegativeAspects": [
      "switch housing is fairly large",
      "large physical dimensions that barely fit in electrical box",
      "deep/wide dimensions requiring sufficient wall box space",
      "excessively large dimensions",
      "requires larger cutout for multi-gang box"
    ],
    "topPositiveAspects": [
      "compact design suitable for single gang electrical box",
      "compact and small",
      "Slim profile allows fitting multiple dimmers in one box",
      "compact size",
      "Standard decorator switch size"
    ]
  },
  {
    "category": "Wiring Configuration and Connections",
    "categoryType": "Physical",
    "mentions": 113,
    "satisfactionRate": 64.2,
    "negativeRate": 35.8,
    "positiveCount": 106,
    "negativeCount": 59,
    "totalReviews": 165,
    "averageRating": 3.95,
    "topNegativeAspects": [
      "does not have wire leads attached",
      "requires neutral wire connection",
      "no ground connection, only 2 prong",
      "requires_separate_neutral_wire",
      "has short in wiring"
    ],
    "topPositiveAspects": [
      "requires neutral wire",
      "Requires neutral wire",
      "no neutral wire required",
      "does not require neutral wire",
      "Stranded wire leads instead of terminals"
    ]
  },
  {
    "category": "Build Quality and Materials",
    "categoryType": "Physical",
    "mentions": 91,
    "satisfactionRate": 62.9,
    "negativeRate": 37.1,
    "positiveCount": 66,
    "negativeCount": 39,
    "totalReviews": 105,
    "averageRating": 3.88,
    "topNegativeAspects": [
      "poor overall construction quality",
      "feel cheap",
      "feels cheaply made with brittle plastic",
      "cheap construction",
      "cheap feeling overall"
    ],
    "topPositiveAspects": [
      "feels well built and solid",
      "well made",
      "Well made build quality",
      "well built",
      "quality construction"
    ]
  },
  {
    "category": "Packaging Quality",
    "categoryType": "Physical",
    "mentions": 32,
    "satisfactionRate": 10.3,
    "negativeRate": 89.7,
    "positiveCount": 4,
    "negativeCount": 35,
    "totalReviews": 39,
    "averageRating": 1.97,
    "topNegativeAspects": [
      "received_used_switches_with_electrical_tape_cut_wires",
      "missing from product",
      "Used/returned product sold as new",
      "Missing parts in packaging",
      "arrived_damaged_box_condition"
    ],
    "topPositiveAspects": [
      "Packaging is new with improved quality",
      "arrived on time well packed",
      "nicely packaged",
      "has clear window in packaging"
    ]
  },
  {
    "category": "Button and Control Interface",
    "categoryType": "Physical",
    "mentions": 44,
    "satisfactionRate": 52.8,
    "negativeRate": 47.2,
    "positiveCount": 28,
    "negativeCount": 25,
    "totalReviews": 53,
    "averageRating": 3.79,
    "topNegativeAspects": [
      "button feels loose and cheap",
      "physical button doesn't work",
      "touch sensor may fail or not respond",
      "flimsy, wobbly, squishy button gear",
      "4 buttons with only brightest or lowest settings option"
    ],
    "topPositiveAspects": [
      "touch-sensitive control panel",
      "Capacitive touch strip for dimming",
      "button below screen for on/off control",
      "Clicky button feel",
      "punch on-off design rather than turn clockwise to turn on design"
    ]
  },
  {
    "category": "Switch Actuation Mechanism",
    "categoryType": "Physical",
    "mentions": 49,
    "satisfactionRate": 69.6,
    "negativeRate": 30.4,
    "positiveCount": 55,
    "negativeCount": 24,
    "totalReviews": 79,
    "averageRating": 4.03,
    "topNegativeAspects": [
      "Touch sensor interface for dimming control",
      "Physical button for on/off operation",
      "horizontal toggle can be confusing",
      "both ends are just clicking buttons, not real switching",
      "toggle feels soft with no solid clicking"
    ],
    "topPositiveAspects": [
      "Rocker switch with side slider design",
      "slider control mechanism",
      "Touch sensor interface for dimming control",
      "Features old school toggle-only design without side slider",
      "toggle functionality"
    ]
  },
  {
    "category": "Mounting and Installation Hardware",
    "categoryType": "Physical",
    "mentions": 25,
    "satisfactionRate": 21.4,
    "negativeRate": 78.6,
    "positiveCount": 6,
    "negativeCount": 22,
    "totalReviews": 28,
    "averageRating": 3.14,
    "topNegativeAspects": [
      "missing_installation_hardware",
      "screws cannot be loosened or tightened",
      "ground wire blocks upper faceplate screw",
      "came with no mounting screws",
      "Missing mounting screws"
    ],
    "topPositiveAspects": [
      "mounting and finishing screws are high-quality",
      "Metal plate instead of plastic for mounting",
      "Screw holes are standard size",
      "No screws on mounting plate",
      "breakable wings on sides for fitting"
    ]
  },
  {
    "category": "Packaging and Documentation",
    "categoryType": "Physical",
    "mentions": 42,
    "satisfactionRate": 52.3,
    "negativeRate": 47.7,
    "positiveCount": 23,
    "negativeCount": 21,
    "totalReviews": 44,
    "averageRating": 3.59,
    "topNegativeAspects": [
      "included wall plate may not be to taste",
      "programming instructions not intuitive",
      "no English instructions provided",
      "missing instructions",
      "instructions leave out critical network connection steps"
    ],
    "topPositiveAspects": [
      "cover plate included",
      "QR code for installation video",
      "Come with matching plate covers and hardware",
      "Include plates which is cost-effective",
      "quality hardware"
    ]
  },
  {
    "category": "Visual Appearance and Aesthetics",
    "categoryType": "Physical",
    "mentions": 118,
    "satisfactionRate": 86.7,
    "negativeRate": 13.3,
    "positiveCount": 130,
    "negativeCount": 20,
    "totalReviews": 150,
    "averageRating": 4.37,
    "topNegativeAspects": [
      "not the prettiest design",
      "Paint on the switch",
      "Color not as pictured",
      "Hard to find color in brick and mortar stores",
      "ugly appearance"
    ],
    "topPositiveAspects": [
      "looks nice",
      "available in black color",
      "looks nice and modern",
      "nice design",
      "modern elegant look"
    ]
  },
  {
    "category": "Slider Mechanisms",
    "categoryType": "Physical",
    "mentions": 39,
    "satisfactionRate": 58.3,
    "negativeRate": 41.7,
    "positiveCount": 28,
    "negativeCount": 20,
    "totalReviews": 48,
    "averageRating": 3.88,
    "topNegativeAspects": [
      "Dimmer slide moves too easily without resistance",
      "slider has small travel length",
      "gets very dirty when pulling up and down",
      "slide is too short",
      "slider with loose tension at bottom 2-3mm"
    ],
    "topPositiveAspects": [
      "Slider for dimming control",
      "dimmer slide",
      "slides smoothly",
      "dimmer slide stays put at setting",
      "slider doesn't move to full on when light is turned off"
    ]
  }
];
export const topPositiveDimmerCategories: CategoryFeedback[] = [
  {
    "category": "Visual Appearance and Aesthetics",
    "categoryType": "Physical",
    "mentions": 118,
    "satisfactionRate": 86.7,
    "negativeRate": 13.3,
    "positiveCount": 130,
    "negativeCount": 20,
    "totalReviews": 150,
    "averageRating": 4.37,
    "topNegativeAspects": [
      "not the prettiest design",
      "Paint on the switch",
      "Color not as pictured",
      "Hard to find color in brick and mortar stores",
      "ugly appearance"
    ],
    "topPositiveAspects": [
      "looks nice",
      "available in black color",
      "looks nice and modern",
      "nice design",
      "modern elegant look"
    ]
  },
  {
    "category": "Wiring Configuration and Connections",
    "categoryType": "Physical",
    "mentions": 113,
    "satisfactionRate": 64.2,
    "negativeRate": 35.8,
    "positiveCount": 106,
    "negativeCount": 59,
    "totalReviews": 165,
    "averageRating": 3.95,
    "topNegativeAspects": [
      "does not have wire leads attached",
      "requires neutral wire connection",
      "no ground connection, only 2 prong",
      "requires_separate_neutral_wire",
      "has short in wiring"
    ],
    "topPositiveAspects": [
      "requires neutral wire",
      "Requires neutral wire",
      "no neutral wire required",
      "does not require neutral wire",
      "Stranded wire leads instead of terminals"
    ]
  },
  {
    "category": "Visual Aesthetics",
    "categoryType": "Physical",
    "mentions": 63,
    "satisfactionRate": 97.5,
    "negativeRate": 2.5,
    "positiveCount": 78,
    "negativeCount": 2,
    "totalReviews": 80,
    "averageRating": 4.6,
    "topNegativeAspects": [
      "looks cheap",
      "looks bad"
    ],
    "topPositiveAspects": [
      "clean and modern looking",
      "Sleek and modern appearance",
      "Nice looking appearance",
      "sleek appearance",
      "elegant and sleek design"
    ]
  },
  {
    "category": "Visual Appearance",
    "categoryType": "Physical",
    "mentions": 55,
    "satisfactionRate": 96.1,
    "negativeRate": 3.9,
    "positiveCount": 73,
    "negativeCount": 3,
    "totalReviews": 76,
    "averageRating": 4.64,
    "topNegativeAspects": [
      "design puts features before usability",
      "Looks off to the rear of the switches",
      "plain jane variety with no soft on/off or led display"
    ],
    "topPositiveAspects": [
      "looks great",
      "looks good",
      "modern and sleek design",
      "Modern appearance",
      "Looks great"
    ]
  },
  {
    "category": "Build Quality and Materials",
    "categoryType": "Physical",
    "mentions": 91,
    "satisfactionRate": 62.9,
    "negativeRate": 37.1,
    "positiveCount": 66,
    "negativeCount": 39,
    "totalReviews": 105,
    "averageRating": 3.88,
    "topNegativeAspects": [
      "poor overall construction quality",
      "feel cheap",
      "feels cheaply made with brittle plastic",
      "cheap construction",
      "cheap feeling overall"
    ],
    "topPositiveAspects": [
      "feels well built and solid",
      "well made",
      "Well made build quality",
      "well built",
      "quality construction"
    ]
  },
  {
    "category": "Size and Fit",
    "categoryType": "Physical",
    "mentions": 105,
    "satisfactionRate": 44.7,
    "negativeRate": 55.3,
    "positiveCount": 55,
    "negativeCount": 68,
    "totalReviews": 123,
    "averageRating": 4.23,
    "topNegativeAspects": [
      "switch housing is fairly large",
      "large physical dimensions that barely fit in electrical box",
      "deep/wide dimensions requiring sufficient wall box space",
      "excessively large dimensions",
      "requires larger cutout for multi-gang box"
    ],
    "topPositiveAspects": [
      "compact design suitable for single gang electrical box",
      "compact and small",
      "Slim profile allows fitting multiple dimmers in one box",
      "compact size",
      "Standard decorator switch size"
    ]
  },
  {
    "category": "Switch Actuation Mechanism",
    "categoryType": "Physical",
    "mentions": 49,
    "satisfactionRate": 69.6,
    "negativeRate": 30.4,
    "positiveCount": 55,
    "negativeCount": 24,
    "totalReviews": 79,
    "averageRating": 4.03,
    "topNegativeAspects": [
      "Touch sensor interface for dimming control",
      "Physical button for on/off operation",
      "horizontal toggle can be confusing",
      "both ends are just clicking buttons, not real switching",
      "toggle feels soft with no solid clicking"
    ],
    "topPositiveAspects": [
      "Rocker switch with side slider design",
      "slider control mechanism",
      "Touch sensor interface for dimming control",
      "Features old school toggle-only design without side slider",
      "toggle functionality"
    ]
  },
  {
    "category": "LED Indicator and Lighting Features",
    "categoryType": "Physical",
    "mentions": 45,
    "satisfactionRate": 77.6,
    "negativeRate": 22.4,
    "positiveCount": 52,
    "negativeCount": 15,
    "totalReviews": 67,
    "averageRating": 4.31,
    "topNegativeAspects": [
      "blue indicator light",
      "Built-in LEDs are very bright in dark room",
      "LED indicator off setting does not turn off brightness level LEDs",
      "Only shows tiny white LED at brightness setting when off",
      "Light on switch is really bright and irritating in dark room"
    ],
    "topPositiveAspects": [
      "LED light bar illuminates for easy to find switch in darkness",
      "LED light bar shows dimness level set",
      "small locator LED",
      "LED indicators on switch",
      "blue indicator light"
    ]
  },
  {
    "category": "Specialized Controls",
    "categoryType": "Physical",
    "mentions": 31,
    "satisfactionRate": 79.6,
    "negativeRate": 20.4,
    "positiveCount": 39,
    "negativeCount": 10,
    "totalReviews": 49,
    "averageRating": 4.24,
    "topNegativeAspects": [
      "don't like having to remove cover to dial up or down",
      "adjustment wheel does nothing",
      "small wheel to set lowest setting does not appear to do much",
      "round dial on right side with no luck adjusting",
      "dimmer range control not visible or accessible after installing cover plate"
    ],
    "topPositiveAspects": [
      "Calibration button for adjusting dimming range",
      "Burst mode feature",
      "Internal adjustment knob for brightness control",
      "has adjustment screw for tuning dimmer",
      "adjustable thumb wheel"
    ]
  },
  {
    "category": "Component Accessories",
    "categoryType": "Physical",
    "mentions": 22,
    "satisfactionRate": 73.5,
    "negativeRate": 26.5,
    "positiveCount": 36,
    "negativeCount": 13,
    "totalReviews": 49,
    "averageRating": 4.31,
    "topNegativeAspects": [
      "no_wire_nuts_included",
      "Bulb adapter requirement for generic LED bulbs",
      "came with no wire nuts",
      "kit lacks bracket required to mount Pico remote",
      "included cheap wire nuts"
    ],
    "topPositiveAspects": [
      "multiple color options with swappable parts in the box",
      "Wire nuts provided",
      "comes with 3 different color face plates (white, almond, beige)",
      "Labels for wiring included",
      "Snap-on cover plate included"
    ]
  }
];
export const topUseCasesDimmer: UseCaseFeedback[] = [
  {
    "useCase": "Functionality Operation",
    "totalMentions": 348,
    "positiveCount": 192,
    "negativeCount": 156,
    "satisfactionRate": 55.2,
    "categoryType": "Physical",
    "topSatisfactionReasons": [
      "LED light bar illuminates for easy to find switch in darkness",
      "slider control mechanism",
      "works without neutral wire",
      "blue LED indicator light on button",
      "touch-sensitive control panel"
    ],
    "topGapReasons": [
      "switch housing is fairly large",
      "button layout changed between v1 and v2 versions",
      "Rocker switch feels flimsy/cheap",
      "bottom button changed from off to hue function",
      "blue LED indicator light on button"
    ],
    "relatedCategories": [
      "Build Quality and Construction",
      "Face Plates",
      "Material Composition",
      "Internal Mechanical Parts",
      "Internal Electronics and Components"
    ]
  },
  {
    "useCase": "Appearance Aesthetics",
    "totalMentions": 343,
    "positiveCount": 297,
    "negativeCount": 46,
    "satisfactionRate": 86.6,
    "categoryType": "Physical",
    "topSatisfactionReasons": [
      "looks great",
      "Rocker switch with side slider design",
      "looks nice",
      "looks good",
      "clean and modern looking"
    ],
    "topGapReasons": [
      "not the prettiest design",
      "White color doesn't match standard white switches",
      "design puts features before usability",
      "load wires same color without proper marking",
      "Looks off to the rear of the switches"
    ],
    "relatedCategories": [
      "Face Plates",
      "Material Composition",
      "Wire Configuration",
      "Wiring Configuration",
      "Internal Electronics and Components"
    ]
  },
  {
    "useCase": "Lighting Control",
    "totalMentions": 199,
    "positiveCount": 133,
    "negativeCount": 66,
    "satisfactionRate": 66.8,
    "categoryType": "Physical",
    "topSatisfactionReasons": [
      "dual dimmer in single switch box position",
      "Calibration button for adjusting dimming range",
      "Touch sensor interface for dimming control",
      "Capacitive touch strip for dimming",
      "Slider for dimming control"
    ],
    "topGapReasons": [
      "Touch sensor interface for dimming control",
      "Dimmer slide moves too easily without resistance",
      "Dimmer slider with adjustable positions",
      "Deeper profile than some other dimmers",
      "Touch plate for dimming seems awkward - causes unintended dimming level changes"
    ],
    "relatedCategories": [
      "Wall Plate Design and Aesthetics",
      "Internal Electronics and Components",
      "Button Interface",
      "Touchscreen Interface",
      "Color and Finish"
    ]
  },
  {
    "useCase": "Quality Durability",
    "totalMentions": 148,
    "positiveCount": 97,
    "negativeCount": 51,
    "satisfactionRate": 65.5,
    "categoryType": "Physical",
    "topSatisfactionReasons": [
      "well made construction",
      "good quality",
      "Good quality",
      "well made and sturdy construction",
      "good quality material"
    ],
    "topGapReasons": [
      "poor overall construction quality",
      "Poor quality construction",
      "Plastic rocker construction prone to breaking",
      "cheap construction",
      "poor_overall_quality"
    ],
    "relatedCategories": [
      "Build Quality and Construction",
      "Material Composition",
      "Internal Electronics and Components",
      "Touchscreen Interface",
      "Switch Shape Design"
    ]
  },
  {
    "useCase": "Smart Home",
    "totalMentions": 96,
    "positiveCount": 81,
    "negativeCount": 15,
    "satisfactionRate": 84.4,
    "categoryType": "Physical",
    "topSatisfactionReasons": [
      "multiple color options with swappable parts in the box",
      "Sleek and modern appearance",
      "Nice looking appearance",
      "Attractive, modern appearance",
      "Modern appearance"
    ],
    "topGapReasons": [
      "heat shrink wrapper that is bulky",
      "ugly appearance",
      "appeared previously used with loose wire nuts",
      "has too many wires for some applications",
      "one switch missing its wrapper"
    ],
    "relatedCategories": [
      "Wire Configuration",
      "Wiring Configuration",
      "Internal Electronics and Components",
      "Touchscreen Interface",
      "Product Certification"
    ]
  },
  {
    "useCase": "Installation Replacement",
    "totalMentions": 87,
    "positiveCount": 36,
    "negativeCount": 51,
    "satisfactionRate": 41.4,
    "categoryType": "Physical",
    "topSatisfactionReasons": [
      "Labels for wiring included",
      "compact design suitable for single gang electrical box",
      "Installation screws included",
      "neutral wire required for installation",
      "QR code for installation video"
    ],
    "topGapReasons": [
      "Switch base is really big making connections difficult to fit in electrical box",
      "Deep profile requiring deep electrical boxes",
      "large physical dimensions that barely fit in electrical box",
      "received_used_switches_with_electrical_tape_cut_wires",
      "Extra pigtails and wire nuts create room issues in electrical box"
    ],
    "relatedCategories": [
      "Wire Configuration",
      "Physical Dimensions and Fit",
      "Terminal Connections",
      "Component Accessories",
      "Physical Size and Fit"
    ]
  },
  {
    "useCase": "Compatibility Fit",
    "totalMentions": 78,
    "positiveCount": 28,
    "negativeCount": 50,
    "satisfactionRate": 35.9,
    "categoryType": "Physical",
    "topSatisfactionReasons": [
      "standard size",
      "compact size",
      "optimal depth for wall box",
      "fits existing box easily",
      "Perfect fit with standard boxes and gang plates"
    ],
    "topGapReasons": [
      "deep/wide dimensions requiring sufficient wall box space",
      "only one traveler wire terminal instead of standard two",
      "arrived_damaged_box_condition",
      "requires larger cutout for multi-gang box",
      "shape not compatible between versions"
    ],
    "relatedCategories": [
      "Physical Dimensions and Fit",
      "Wire Connection Mechanisms",
      "Physical Size and Fit",
      "Installation Compatibility",
      "Mounting and Installation Hardware"
    ]
  },
  {
    "useCase": "Energy Efficiency",
    "totalMentions": 53,
    "positiveCount": 36,
    "negativeCount": 17,
    "satisfactionRate": 67.9,
    "categoryType": "Physical",
    "topSatisfactionReasons": [
      "LED light bar shows dimness level set",
      "small locator LED",
      "Small LED indicator light that can be turned on or off",
      "has LED indicator lights",
      "small LED indicator dot"
    ],
    "topGapReasons": [
      "Bulb adapter requirement for generic LED bulbs",
      "wire labels mislabeled on device",
      "has LED indicator lights",
      "plain jane variety with no soft on/off or led display",
      "Requires power and common at end of chain for 3-way setup"
    ],
    "relatedCategories": [
      "Indicator Lighting",
      "Wire Configuration",
      "LED Indicator and Lighting Features",
      "Internal Electronics and Components",
      "Wiring Configuration and Connections"
    ]
  },
  {
    "useCase": "Value Price",
    "totalMentions": 37,
    "positiveCount": 5,
    "negativeCount": 32,
    "satisfactionRate": 13.5,
    "categoryType": "Physical",
    "topSatisfactionReasons": [
      "Include plates which is cost-effective",
      "not cheap or flimsy feel",
      "not cheaply made",
      "doesn't feel cheap",
      "Well-made plastic that doesn't feel cheap or brittle"
    ],
    "topGapReasons": [
      "feel cheap",
      "Cheaply made",
      "feels cheap",
      "feels cheaply made with brittle plastic",
      "cheap feeling overall"
    ],
    "relatedCategories": [
      "Build Quality and Materials",
      "Build Quality and Construction",
      "Material Composition",
      "Internal Mechanical Parts",
      "Structural Durability"
    ]
  },
  {
    "useCase": "Performance Reliability",
    "totalMentions": 5,
    "positiveCount": 4,
    "negativeCount": 1,
    "satisfactionRate": 80.0,
    "categoryType": "Physical",
    "topSatisfactionReasons": [
      "adjustable thumb wheel",
      "Adjustable wheel for configuration",
      "adjustable setting on internal face"
    ],
    "topGapReasons": [
      "UL rated 250W but performance verified 150W"
    ],
    "relatedCategories": [
      "Specialized Controls",
      "Internal Components",
      "Specialized Features",
      "Power Specifications"
    ]
  }
];
export const allDimmerCategories: CategoryFeedback[] = [
  {
    "category": "Physical Durability",
    "categoryType": "Physical",
    "mentions": 25,
    "satisfactionRate": 0.0,
    "negativeRate": 100.0,
    "positiveCount": 0,
    "negativeCount": 12,
    "totalReviews": 12,
    "averageRating": 1.58,
    "topNegativeAspects": [
      "Falls apart after installation",
      "button doesn't work",
      "Cracked plastic insert and missing retainers",
      "parts falling off or internal parts breaking",
      "air gap switch comes off when pressed at the top"
    ],
    "topPositiveAspects": []
  },
  {
    "category": "Surface Characteristics",
    "categoryType": "Physical",
    "mentions": 2,
    "satisfactionRate": 0.0,
    "negativeRate": 100.0,
    "positiveCount": 0,
    "negativeCount": 2,
    "totalReviews": 2,
    "averageRating": 1.0,
    "topNegativeAspects": [
      "dimmer and plate were scratched and sticky",
      "Leviton printed into the face collects dirt"
    ],
    "topPositiveAspects": []
  },
  {
    "category": "Product Condition Issues",
    "categoryType": "Physical",
    "mentions": 1,
    "satisfactionRate": 0.0,
    "negativeRate": 100.0,
    "positiveCount": 0,
    "negativeCount": 3,
    "totalReviews": 3,
    "averageRating": 1.0,
    "topNegativeAspects": [
      "damaged wires"
    ],
    "topPositiveAspects": []
  },
  {
    "category": "Color Matching",
    "categoryType": "Physical",
    "mentions": 2,
    "satisfactionRate": 0.0,
    "negativeRate": 100.0,
    "positiveCount": 0,
    "negativeCount": 3,
    "totalReviews": 3,
    "averageRating": 1.67,
    "topNegativeAspects": [
      "White color doesn't match standard white switches",
      "White color much brighter than typical switches"
    ],
    "topPositiveAspects": []
  },
  {
    "category": "Toggle Operation",
    "categoryType": "Physical",
    "mentions": 1,
    "satisfactionRate": 0.0,
    "negativeRate": 100.0,
    "positiveCount": 0,
    "negativeCount": 1,
    "totalReviews": 1,
    "averageRating": 1.0,
    "topNegativeAspects": [
      "toggle feels like it's going to fall off"
    ],
    "topPositiveAspects": []
  },
  {
    "category": "Color Accuracy",
    "categoryType": "Physical",
    "mentions": 1,
    "satisfactionRate": 0.0,
    "negativeRate": 100.0,
    "positiveCount": 0,
    "negativeCount": 1,
    "totalReviews": 1,
    "averageRating": 3.0,
    "topNegativeAspects": [
      "brighter white borders that don't match regular switches"
    ],
    "topPositiveAspects": []
  },
  {
    "category": "Surface Durability",
    "categoryType": "Physical",
    "mentions": 1,
    "satisfactionRate": 0.0,
    "negativeRate": 100.0,
    "positiveCount": 0,
    "negativeCount": 1,
    "totalReviews": 1,
    "averageRating": 1.0,
    "topNegativeAspects": [
      "scratched surface"
    ],
    "topPositiveAspects": []
  },
  {
    "category": "Internal Mechanical Parts",
    "categoryType": "Physical",
    "mentions": 7,
    "satisfactionRate": 0.0,
    "negativeRate": 100.0,
    "positiveCount": 0,
    "negativeCount": 7,
    "totalReviews": 7,
    "averageRating": 1.14,
    "topNegativeAspects": [
      "internal switch mechanism",
      "paddle pins",
      "aluminum sides",
      "cheap_internal_parts",
      "switch_breaks_at_pivot_point"
    ],
    "topPositiveAspects": []
  },
  {
    "category": "Switch Operation Feel",
    "categoryType": "Physical",
    "mentions": 1,
    "satisfactionRate": 0.0,
    "negativeRate": 100.0,
    "positiveCount": 0,
    "negativeCount": 3,
    "totalReviews": 3,
    "averageRating": 2.67,
    "topNegativeAspects": [
      "Rocker switch feels flimsy/cheap"
    ],
    "topPositiveAspects": []
  },
  {
    "category": "Surface Condition and Finish",
    "categoryType": "Physical",
    "mentions": 5,
    "satisfactionRate": 0.0,
    "negativeRate": 100.0,
    "positiveCount": 0,
    "negativeCount": 5,
    "totalReviews": 5,
    "averageRating": 1.0,
    "topNegativeAspects": [
      "gunk and grime all over it",
      "label is old, worn and falling off",
      "very scratched",
      "dry wall plaster all over it",
      "used condition appearance"
    ],
    "topPositiveAspects": []
  },
  {
    "category": "Component Reliability",
    "categoryType": "Physical",
    "mentions": 5,
    "satisfactionRate": 0.0,
    "negativeRate": 100.0,
    "positiveCount": 0,
    "negativeCount": 5,
    "totalReviews": 5,
    "averageRating": 2.2,
    "topNegativeAspects": [
      "spring in the on off snapped",
      "Screws do not stay set",
      "Screw lugs collapse into body of switch",
      "mounting screws strip almost immediately",
      "phillips screws instead of robertson screws"
    ],
    "topPositiveAspects": []
  },
  {
    "category": "Wall Plate Fit and Alignment",
    "categoryType": "Physical",
    "mentions": 2,
    "satisfactionRate": 0.0,
    "negativeRate": 100.0,
    "positiveCount": 0,
    "negativeCount": 2,
    "totalReviews": 2,
    "averageRating": 3.5,
    "topNegativeAspects": [
      "face is not recessed so cover plate sits proud of wall",
      "wall plate moves around when bumped"
    ],
    "topPositiveAspects": []
  },
  {
    "category": "Internal Mounting Components",
    "categoryType": "Physical",
    "mentions": 1,
    "satisfactionRate": 0.0,
    "negativeRate": 100.0,
    "positiveCount": 0,
    "negativeCount": 1,
    "totalReviews": 1,
    "averageRating": 5.0,
    "topNegativeAspects": [
      "Plastic carrier can be pulled in too far if over-tightened"
    ],
    "topPositiveAspects": []
  },
  {
    "category": "Operational Feedback",
    "categoryType": "Physical",
    "mentions": 1,
    "satisfactionRate": 0.0,
    "negativeRate": 100.0,
    "positiveCount": 0,
    "negativeCount": 1,
    "totalReviews": 1,
    "averageRating": 3.0,
    "topNegativeAspects": [
      "creaks when button pressed"
    ],
    "topPositiveAspects": []
  },
  {
    "category": "Switch Housing",
    "categoryType": "Physical",
    "mentions": 1,
    "satisfactionRate": 0.0,
    "negativeRate": 100.0,
    "positiveCount": 0,
    "negativeCount": 1,
    "totalReviews": 1,
    "averageRating": 1.0,
    "topNegativeAspects": [
      "susceptible_to_pressure_from_wires_or_materials"
    ],
    "topPositiveAspects": []
  },
  {
    "category": "Terminal Connections",
    "categoryType": "Physical",
    "mentions": 10,
    "satisfactionRate": 10.0,
    "negativeRate": 90.0,
    "positiveCount": 1,
    "negativeCount": 9,
    "totalReviews": 10,
    "averageRating": 1.8,
    "topNegativeAspects": [
      "set screw was fused and would not tighten",
      "stripped screw complicates installation",
      "brass screw on Y terminal was stripped",
      "unable to loosen screws that secure wires",
      "factory torqued screws to excessive tightness"
    ],
    "topPositiveAspects": [
      "wires can be removed by loosening side screw"
    ]
  },
  {
    "category": "Packaging Quality",
    "categoryType": "Physical",
    "mentions": 32,
    "satisfactionRate": 10.3,
    "negativeRate": 89.7,
    "positiveCount": 4,
    "negativeCount": 35,
    "totalReviews": 39,
    "averageRating": 1.97,
    "topNegativeAspects": [
      "received_used_switches_with_electrical_tape_cut_wires",
      "missing from product",
      "Used/returned product sold as new",
      "Missing parts in packaging",
      "arrived_damaged_box_condition"
    ],
    "topPositiveAspects": [
      "Packaging is new with improved quality",
      "arrived on time well packed",
      "nicely packaged",
      "has clear window in packaging"
    ]
  },
  {
    "category": "Material Composition",
    "categoryType": "Physical",
    "mentions": 18,
    "satisfactionRate": 11.1,
    "negativeRate": 88.9,
    "positiveCount": 2,
    "negativeCount": 16,
    "totalReviews": 18,
    "averageRating": 3.0,
    "topNegativeAspects": [
      "cheap plastic",
      "Material feels low quality",
      "lower grade plastic material compared to name brand switches",
      "flimsy plastic construction",
      "very cheap plastic"
    ],
    "topPositiveAspects": [
      "metal housing",
      "Premium material quality"
    ]
  },
  {
    "category": "Rocker Switch Mechanisms",
    "categoryType": "Physical",
    "mentions": 7,
    "satisfactionRate": 12.5,
    "negativeRate": 87.5,
    "positiveCount": 1,
    "negativeCount": 7,
    "totalReviews": 8,
    "averageRating": 2.75,
    "topNegativeAspects": [
      "Plastic rocker construction prone to breaking",
      "rocker is stiff to turn on/off",
      "Small ball with spring allowing toggling of metal contactor rocker comes loose with normal use",
      "Rocker switch mechanism is poorly designed",
      "Rocker pivots on two small points (1/8\" or less)"
    ],
    "topPositiveAspects": [
      "switch is flush on the front"
    ]
  },
  {
    "category": "Button and Switch Operation",
    "categoryType": "Physical",
    "mentions": 18,
    "satisfactionRate": 16.7,
    "negativeRate": 83.3,
    "positiveCount": 3,
    "negativeCount": 15,
    "totalReviews": 18,
    "averageRating": 3.22,
    "topNegativeAspects": [
      "buttons failed after 3 years",
      "buttons require much firmer push than other switches",
      "manual operation uses only bottom half of switch for both on and off",
      "buttons require pressing to dim up or down",
      "on/off switch could be a little larger"
    ],
    "topPositiveAspects": [
      "button layout with brightness buttons easy to press and on/off big enough",
      "separate on/off switch",
      "toggle switch"
    ]
  },
  {
    "category": "Audio Feedback",
    "categoryType": "Physical",
    "mentions": 6,
    "satisfactionRate": 16.7,
    "negativeRate": 83.3,
    "positiveCount": 1,
    "negativeCount": 5,
    "totalReviews": 6,
    "averageRating": 3.17,
    "topNegativeAspects": [
      "Produces loud clicking sounds during operation",
      "noisy operation",
      "loud noticeable click from inside when turned on",
      "Louder click than normal switches"
    ],
    "topPositiveAspects": [
      "quiet_operation"
    ]
  },
  {
    "category": "Dimmer Controls",
    "categoryType": "Physical",
    "mentions": 10,
    "satisfactionRate": 18.2,
    "negativeRate": 81.8,
    "positiveCount": 2,
    "negativeCount": 9,
    "totalReviews": 11,
    "averageRating": 3.27,
    "topNegativeAspects": [
      "Dimmer slider with adjustable positions",
      "Sharp slider dial that can hurt when touched",
      "Dimmer gets stuck slightly on minimum position",
      "Dimmer slide button stands too prominent from switch face",
      "Dimmer bar with halfway position"
    ],
    "topPositiveAspects": [
      "Tiny slider at the bottom of the switch paddle",
      "Easy slide mechanism"
    ]
  },
  {
    "category": "Product Packaging",
    "categoryType": "Physical",
    "mentions": 2,
    "satisfactionRate": 20.0,
    "negativeRate": 80.0,
    "positiveCount": 1,
    "negativeCount": 4,
    "totalReviews": 5,
    "averageRating": 1.2,
    "topNegativeAspects": [
      "damaged/opened packaging"
    ],
    "topPositiveAspects": [
      "packaged properly"
    ]
  },
  {
    "category": "Plug Configuration",
    "categoryType": "Physical",
    "mentions": 3,
    "satisfactionRate": 20.0,
    "negativeRate": 80.0,
    "positiveCount": 1,
    "negativeCount": 4,
    "totalReviews": 5,
    "averageRating": 2.6,
    "topNegativeAspects": [
      "plug orientation reversed by manufacturer",
      "non polarized plug"
    ],
    "topPositiveAspects": [
      "90 degree plug design"
    ]
  },
  {
    "category": "Mounting and Installation Hardware",
    "categoryType": "Physical",
    "mentions": 25,
    "satisfactionRate": 21.4,
    "negativeRate": 78.6,
    "positiveCount": 6,
    "negativeCount": 22,
    "totalReviews": 28,
    "averageRating": 3.14,
    "topNegativeAspects": [
      "missing_installation_hardware",
      "screws cannot be loosened or tightened",
      "ground wire blocks upper faceplate screw",
      "came with no mounting screws",
      "Missing mounting screws"
    ],
    "topPositiveAspects": [
      "mounting and finishing screws are high-quality",
      "Metal plate instead of plastic for mounting",
      "Screw holes are standard size",
      "No screws on mounting plate",
      "breakable wings on sides for fitting"
    ]
  },
  {
    "category": "Cover Plates",
    "categoryType": "Physical",
    "mentions": 13,
    "satisfactionRate": 22.2,
    "negativeRate": 77.8,
    "positiveCount": 4,
    "negativeCount": 14,
    "totalReviews": 18,
    "averageRating": 3.61,
    "topNegativeAspects": [
      "no faceplate included",
      "No cover included",
      "cover plate difficult to snap on",
      "enclosed cover wouldn't stay on",
      "Face plate has broken off from the switch"
    ],
    "topPositiveAspects": [
      "snap-on cover plate without screws for cleaner look",
      "screw-secured cover"
    ]
  },
  {
    "category": "Tactile and Audio Feedback",
    "categoryType": "Physical",
    "mentions": 12,
    "satisfactionRate": 23.1,
    "negativeRate": 76.9,
    "positiveCount": 3,
    "negativeCount": 10,
    "totalReviews": 13,
    "averageRating": 3.62,
    "topNegativeAspects": [
      "loud clicks",
      "bad tactile feel",
      "lacks tactile feel of normal switches",
      "would prefer more click feedback when pressed but still gives fair amount",
      "tactile feeling feels mushy and cheap"
    ],
    "topPositiveAspects": [
      "solid click sound",
      "tactile quality feel",
      "satisfying positive click better than springy higher pitch click"
    ]
  },
  {
    "category": "Indicator Lights and Visual Feedback",
    "categoryType": "Physical",
    "mentions": 4,
    "satisfactionRate": 25.0,
    "negativeRate": 75.0,
    "positiveCount": 1,
    "negativeCount": 3,
    "totalReviews": 4,
    "averageRating": 2.5,
    "topNegativeAspects": [
      "LED indicator color changing not supported",
      "blue light too bright",
      "started blinking blue after 3 years"
    ],
    "topPositiveAspects": [
      "blue indicator light goes on and off to indicate switch cycling"
    ]
  },
  {
    "category": "Included Components",
    "categoryType": "Physical",
    "mentions": 7,
    "satisfactionRate": 28.6,
    "negativeRate": 71.4,
    "positiveCount": 2,
    "negativeCount": 5,
    "totalReviews": 7,
    "averageRating": 2.57,
    "topNegativeAspects": [
      "missing screws for wall plate",
      "missing all screws in used unit",
      "small hole on lower left front with no LED light",
      "recessed potentiometer on bottom that does nothing",
      "missing wire connectors"
    ],
    "topPositiveAspects": [
      "wire nuts, screws, and screwless faceplate included",
      "comes complete with wall plates"
    ]
  },
  {
    "category": "Button Operation",
    "categoryType": "Physical",
    "mentions": 15,
    "satisfactionRate": 33.3,
    "negativeRate": 66.7,
    "positiveCount": 5,
    "negativeCount": 10,
    "totalReviews": 15,
    "averageRating": 3.53,
    "topNegativeAspects": [
      "Click of the switch is more masculine than it should be",
      "cheaply made buttons",
      "Tactile feedback quality",
      "difficult to press in just the right way",
      "feels like thin plastic with almost no resistance"
    ],
    "topPositiveAspects": [
      "Click feel is awesome, snappy and responsive",
      "good feel buttons",
      "robust ON/OFF switch with positive snap",
      "easy to use switch",
      "smooth switch push operation"
    ]
  },
  {
    "category": "Structural Mounting Features",
    "categoryType": "Physical",
    "mentions": 6,
    "satisfactionRate": 33.3,
    "negativeRate": 66.7,
    "positiveCount": 2,
    "negativeCount": 4,
    "totalReviews": 6,
    "averageRating": 3.17,
    "topNegativeAspects": [
      "three tabs on the right side were broken off",
      "mounting plate wing breakaways don't break away",
      "little_tab_breaks_during_installation",
      "large_ears_stick_out_on_both_sides_preventing_installation_of_two_next_to_each_other"
    ],
    "topPositiveAspects": [
      "has removable side wings for multi-gang installation",
      "has breakable side tab for mounting flexibility"
    ]
  },
  {
    "category": "Color Matching and Consistency",
    "categoryType": "Physical",
    "mentions": 3,
    "satisfactionRate": 33.3,
    "negativeRate": 66.7,
    "positiveCount": 1,
    "negativeCount": 2,
    "totalReviews": 3,
    "averageRating": 3.0,
    "topNegativeAspects": [
      "color is off - not true white, looks almost gray",
      "yellowish tone compared to other white products"
    ],
    "topPositiveAspects": [
      "color matches adjacent traditional switches perfectly"
    ]
  },
  {
    "category": "Face Plates",
    "categoryType": "Physical",
    "mentions": 3,
    "satisfactionRate": 33.3,
    "negativeRate": 66.7,
    "positiveCount": 1,
    "negativeCount": 2,
    "totalReviews": 3,
    "averageRating": 4.33,
    "topNegativeAspects": [
      "Small size plate that doesn't cover original switch area",
      "Switch plate cover with poor plastic finish"
    ],
    "topPositiveAspects": [
      "Includes faceplate"
    ]
  },
  {
    "category": "Cover Plates and Faceplates",
    "categoryType": "Physical",
    "mentions": 15,
    "satisfactionRate": 35.3,
    "negativeRate": 64.7,
    "positiveCount": 6,
    "negativeCount": 11,
    "totalReviews": 17,
    "averageRating": 4.12,
    "topNegativeAspects": [
      "Does not come with wall plate as advertised",
      "Special cover plate required",
      "some plates won't work well in multigang box",
      "Missing cover/faceplate",
      "no_plate_included"
    ],
    "topPositiveAspects": [
      "Comes with finishing plate/screwless faceplate",
      "uses standard old-fashioned switch plate",
      "face can be easily changed by snapping together",
      "can use standard deco wall plate",
      "interchangeable faceplates"
    ]
  },
  {
    "category": "Installation Fit",
    "categoryType": "Physical",
    "mentions": 7,
    "satisfactionRate": 37.5,
    "negativeRate": 62.5,
    "positiveCount": 3,
    "negativeCount": 5,
    "totalReviews": 8,
    "averageRating": 3.38,
    "topNegativeAspects": [
      "Plastic tabs that hold switch are too thick causing plate not to sit flush",
      "Not flush like other model",
      "does not sit flush to wall",
      "not flush and tight fit",
      "knob will not sit flush with backplates"
    ],
    "topPositiveAspects": [
      "fits with standard switch cover",
      "Switch sits flush to wall"
    ]
  },
  {
    "category": "Wiring Configuration",
    "categoryType": "Physical",
    "mentions": 15,
    "satisfactionRate": 40.0,
    "negativeRate": 60.0,
    "positiveCount": 8,
    "negativeCount": 12,
    "totalReviews": 20,
    "averageRating": 3.85,
    "topNegativeAspects": [
      "Extra pigtails and wire nuts create room issues in electrical box",
      "requires neutral wire",
      "load wires same color without proper marking",
      "stiff and hard to route wires",
      "heat shrink wrapper that is bulky"
    ],
    "topPositiveAspects": [
      "Requires neutral wire",
      "4-wire configuration",
      "wire terminations",
      "plug in wire connections",
      "Labeled wires for easy installation"
    ]
  },
  {
    "category": "Cord Design",
    "categoryType": "Physical",
    "mentions": 9,
    "satisfactionRate": 40.0,
    "negativeRate": 60.0,
    "positiveCount": 4,
    "negativeCount": 6,
    "totalReviews": 10,
    "averageRating": 3.7,
    "topNegativeAspects": [
      "short cord length",
      "cord length could be longer",
      "two cords required (lamp cord to outlet, dimmer cord back)",
      "very thin cables",
      "exposed wire end"
    ],
    "topPositiveAspects": [
      "cord is quite long",
      "extra long cord on controller",
      "touch pad on cord for flexible placement",
      "heavy cord leads"
    ]
  },
  {
    "category": "Sound During Operation",
    "categoryType": "Physical",
    "mentions": 4,
    "satisfactionRate": 40.0,
    "negativeRate": 60.0,
    "positiveCount": 2,
    "negativeCount": 3,
    "totalReviews": 5,
    "averageRating": 3.4,
    "topNegativeAspects": [
      "Audible click when switched",
      "produces noise during operation"
    ],
    "topPositiveAspects": [
      "Silent rocker operation",
      "Quiet operation"
    ]
  },
  {
    "category": "Mounting and Installation",
    "categoryType": "Physical",
    "mentions": 10,
    "satisfactionRate": 40.0,
    "negativeRate": 60.0,
    "positiveCount": 4,
    "negativeCount": 6,
    "totalReviews": 10,
    "averageRating": 3.6,
    "topNegativeAspects": [
      "does not physically mount well with other switches creating ugly or unsafe mount",
      "doesn't stay attached to switch toggle well",
      "easy to pull off wall",
      "trouble with screws to secure to light switch",
      "finicky mounting with tape that floats away from wall"
    ],
    "topPositiveAspects": [
      "screw system is reassuring",
      "provides slight wiggle room for adjustment",
      "pops on over regular light switch",
      "clamps over light switch non-destructively"
    ]
  },
  {
    "category": "Material Quality",
    "categoryType": "Physical",
    "mentions": 4,
    "satisfactionRate": 42.9,
    "negativeRate": 57.1,
    "positiveCount": 3,
    "negativeCount": 4,
    "totalReviews": 7,
    "averageRating": 3.43,
    "topNegativeAspects": [
      "Made with plastic components",
      "cheap plastic construction"
    ],
    "topPositiveAspects": [
      "good quality material",
      "Made with metal components"
    ]
  },
  {
    "category": "Indicator Lighting",
    "categoryType": "Physical",
    "mentions": 8,
    "satisfactionRate": 42.9,
    "negativeRate": 57.1,
    "positiveCount": 6,
    "negativeCount": 8,
    "totalReviews": 14,
    "averageRating": 3.71,
    "topNegativeAspects": [
      "blue LED indicator light on button",
      "Light on switch symbol should be brighter when light is on",
      "Status light won't turn on when switch is dead",
      "Green indicator light stays on even when switch stops working",
      "red indicator light removed from newer versions"
    ],
    "topPositiveAspects": [
      "blue LED indicator light on button",
      "Small LED indicators for each control"
    ]
  },
  {
    "category": "Internal Electronics and Components",
    "categoryType": "Physical",
    "mentions": 29,
    "satisfactionRate": 43.3,
    "negativeRate": 56.7,
    "positiveCount": 13,
    "negativeCount": 17,
    "totalReviews": 30,
    "averageRating": 2.87,
    "topNegativeAspects": [
      "Defective units with faulty remote switch functionality",
      "Interior guts of the switch",
      "Internal plastic switch that snaps into assembly",
      "Button component",
      "ESP8266 boards"
    ],
    "topPositiveAspects": [
      "has built in relay",
      "PCB looks decent",
      "well made circuit board",
      "ESP32-C3 chip inside",
      "aluminum cover on back to cool power electronics"
    ]
  },
  {
    "category": "Button Interface",
    "categoryType": "Physical",
    "mentions": 13,
    "satisfactionRate": 43.8,
    "negativeRate": 56.2,
    "positiveCount": 7,
    "negativeCount": 9,
    "totalReviews": 16,
    "averageRating": 3.62,
    "topNegativeAspects": [
      "button layout changed between v1 and v2 versions",
      "bottom button changed from off to hue function",
      "top button for on/off",
      "physical buttons",
      "paddle button"
    ],
    "topPositiveAspects": [
      "one button for on/off",
      "center rocker for dimming",
      "button for scene selection",
      "big buttons",
      "Side controls for fan speed and dimmer"
    ]
  },
  {
    "category": "Switch Mechanism Feel",
    "categoryType": "Physical",
    "mentions": 9,
    "satisfactionRate": 44.4,
    "negativeRate": 55.6,
    "positiveCount": 4,
    "negativeCount": 5,
    "totalReviews": 9,
    "averageRating": 3.44,
    "topNegativeAspects": [
      "has no resistance when pushed and feels mushy",
      "doesn't snap like a normal switch to on/off",
      "can be easily put in between on/off position",
      "rocker switch component that can break",
      "lacks crisp tactile click when switching"
    ],
    "topPositiveAspects": [
      "has good positive feel when switching on and off",
      "huge rocker paddle for on/off control",
      "high quality feel of physical switch and dimmer",
      "gentle tap operation for on/off and brightness control"
    ]
  },
  {
    "category": "Size and Fit",
    "categoryType": "Physical",
    "mentions": 105,
    "satisfactionRate": 44.7,
    "negativeRate": 55.3,
    "positiveCount": 55,
    "negativeCount": 68,
    "totalReviews": 123,
    "averageRating": 4.23,
    "topNegativeAspects": [
      "switch housing is fairly large",
      "large physical dimensions that barely fit in electrical box",
      "deep/wide dimensions requiring sufficient wall box space",
      "excessively large dimensions",
      "requires larger cutout for multi-gang box"
    ],
    "topPositiveAspects": [
      "compact design suitable for single gang electrical box",
      "compact and small",
      "Slim profile allows fitting multiple dimmers in one box",
      "compact size",
      "Standard decorator switch size"
    ]
  },
  {
    "category": "Wire Configuration",
    "categoryType": "Physical",
    "mentions": 18,
    "satisfactionRate": 45.0,
    "negativeRate": 55.0,
    "positiveCount": 9,
    "negativeCount": 11,
    "totalReviews": 20,
    "averageRating": 3.35,
    "topNegativeAspects": [
      "wire labels mislabeled on device",
      "wire color coding keeps changing",
      "markings on back of unit are nonsensical",
      "Pre-stripped traveler wire not capped",
      "pre-attached wires instead of using existing wall cables"
    ],
    "topPositiveAspects": [
      "Different colors wire for HOT",
      "gray black and purple wiring harness pigtail",
      "violet and purple (0-10 vdc) wires",
      "0-10v (5 wires to the fixture) design",
      "six wires including two red, black, blue, white, and green"
    ]
  },
  {
    "category": "Structural Durability",
    "categoryType": "Physical",
    "mentions": 10,
    "satisfactionRate": 45.5,
    "negativeRate": 54.5,
    "positiveCount": 5,
    "negativeCount": 6,
    "totalReviews": 11,
    "averageRating": 2.73,
    "topNegativeAspects": [
      "Poor quality construction",
      "All plastic plate that attaches to the box",
      "Cheaply built and can easily break",
      "Extremely low quality construction",
      "Component quality and materials"
    ],
    "topPositiveAspects": [
      "Switch seems sturdy",
      "High quality construction",
      "well-constructed",
      "feels solid and not cheap",
      "well constructed"
    ]
  },
  {
    "category": "Packaging Condition",
    "categoryType": "Physical",
    "mentions": 2,
    "satisfactionRate": 50.0,
    "negativeRate": 50.0,
    "positiveCount": 1,
    "negativeCount": 1,
    "totalReviews": 2,
    "averageRating": 3.0,
    "topNegativeAspects": [
      "heavily used switch with missing cover, screws, wiring nuts, and instructions"
    ],
    "topPositiveAspects": [
      "packaged well in mint condition"
    ]
  },
  {
    "category": "Switch Operation Mechanism",
    "categoryType": "Physical",
    "mentions": 6,
    "satisfactionRate": 50.0,
    "negativeRate": 50.0,
    "positiveCount": 3,
    "negativeCount": 3,
    "totalReviews": 6,
    "averageRating": 3.33,
    "topNegativeAspects": [
      "lacks satisfying click action compared to traditional switches",
      "rocker loose, didn't click on/off",
      "bottom of rocker sticks out past dimmer slider"
    ],
    "topPositiveAspects": [
      "not a rocker switch, it's a simple pressure switch with no up for on, down for off",
      "paddle switch design",
      "detachable to select type of lights used"
    ]
  },
  {
    "category": "Wire Connection Mechanisms",
    "categoryType": "Physical",
    "mentions": 5,
    "satisfactionRate": 50.0,
    "negativeRate": 50.0,
    "positiveCount": 3,
    "negativeCount": 3,
    "totalReviews": 6,
    "averageRating": 3.5,
    "topNegativeAspects": [
      "only one traveler wire terminal instead of standard two",
      "wires not secure in plug-in connectors"
    ],
    "topPositiveAspects": [
      "easy push in design to eliminate wire nuts",
      "premium wire screw downs",
      "wire clamps already open and ready"
    ]
  },
  {
    "category": "Safety Certifications",
    "categoryType": "Physical",
    "mentions": 6,
    "satisfactionRate": 50.0,
    "negativeRate": 50.0,
    "positiveCount": 3,
    "negativeCount": 3,
    "totalReviews": 6,
    "averageRating": 3.5,
    "topNegativeAspects": [
      "ETL listed but not UL listed",
      "zero safety certifications (no UL, ETL, CE)",
      "only FCC certification"
    ],
    "topPositiveAspects": [
      "UL Listed dimmer switches",
      "UL tested/certified",
      "independently tested for safety by nationally recognized testing laboratory"
    ]
  },
  {
    "category": "Wiring Connections",
    "categoryType": "Physical",
    "mentions": 12,
    "satisfactionRate": 50.0,
    "negativeRate": 50.0,
    "positiveCount": 7,
    "negativeCount": 7,
    "totalReviews": 14,
    "averageRating": 3.07,
    "topNegativeAspects": [
      "wire connection terminals",
      "terminals inset into body with too much gap",
      "push-in connection hole too small for 12-gauge wire",
      "can't get wires on screw",
      "Clamps that fail to open to accept wires"
    ],
    "topPositiveAspects": [
      "Three or four wire capability for 3-way or single pole install",
      "Includes plastic tie off caps",
      "connections did not look like they had ever been connected",
      "Two straight conductors can be inserted with internal clamp",
      "Line and load terminals take 2 conductors, ground terminal takes one"
    ]
  },
  {
    "category": "Switch Operation",
    "categoryType": "Physical",
    "mentions": 2,
    "satisfactionRate": 50.0,
    "negativeRate": 50.0,
    "positiveCount": 1,
    "negativeCount": 1,
    "totalReviews": 2,
    "averageRating": 4.5,
    "topNegativeAspects": [
      "Switch paddle with poor plastic finish that scratches easily"
    ],
    "topPositiveAspects": [
      "Switch paddle component"
    ]
  },
  {
    "category": "Color Quality",
    "categoryType": "Physical",
    "mentions": 4,
    "satisfactionRate": 50.0,
    "negativeRate": 50.0,
    "positiveCount": 2,
    "negativeCount": 2,
    "totalReviews": 4,
    "averageRating": 3.5,
    "topNegativeAspects": [
      "Very bright white color compared to existing switches",
      "Has yellow tint instead of pure white"
    ],
    "topPositiveAspects": [
      "Nice bright white color",
      "Bright white color as expected"
    ]
  },
  {
    "category": "LED Indicator Design",
    "categoryType": "Physical",
    "mentions": 2,
    "satisfactionRate": 50.0,
    "negativeRate": 50.0,
    "positiveCount": 1,
    "negativeCount": 1,
    "totalReviews": 2,
    "averageRating": 4.0,
    "topNegativeAspects": [
      "cannot change LED color unlike other brands"
    ],
    "topPositiveAspects": [
      "soft LED indicator light not too bright or distracting"
    ]
  },
  {
    "category": "Wall Plate Design and Aesthetics",
    "categoryType": "Physical",
    "mentions": 2,
    "satisfactionRate": 50.0,
    "negativeRate": 50.0,
    "positiveCount": 1,
    "negativeCount": 1,
    "totalReviews": 2,
    "averageRating": 4.0,
    "topNegativeAspects": [
      "dual front panel is annoying"
    ],
    "topPositiveAspects": [
      "good dimmer plates"
    ]
  },
  {
    "category": "Construction Quality",
    "categoryType": "Physical",
    "mentions": 28,
    "satisfactionRate": 51.4,
    "negativeRate": 48.6,
    "positiveCount": 19,
    "negativeCount": 18,
    "totalReviews": 37,
    "averageRating": 3.32,
    "topNegativeAspects": [
      "cheaply made construction",
      "weighs close to nothing and feels cheap",
      "Poor manufacturing quality",
      "Overheating and burning plastic smell",
      "Loose and rattly parts in non-smart version"
    ],
    "topPositiveAspects": [
      "well made construction",
      "good quality",
      "Higher construction quality than non-smart version",
      "build quality seems fine",
      "well-made construction"
    ]
  },
  {
    "category": "Physical Dimensions",
    "categoryType": "Physical",
    "mentions": 22,
    "satisfactionRate": 51.9,
    "negativeRate": 48.1,
    "positiveCount": 14,
    "negativeCount": 13,
    "totalReviews": 27,
    "averageRating": 4.07,
    "topNegativeAspects": [
      "Switch base is really big making connections difficult to fit in electrical box",
      "Deep profile requiring deep electrical boxes",
      "shape not compatible between versions",
      "Deeper than regular switch",
      "Electronics box is oversized"
    ],
    "topPositiveAspects": [
      "compact and small form factor",
      "optimal depth for wall box",
      "fits existing box easily",
      "narrower than most other switches",
      "smaller than other brands"
    ]
  },
  {
    "category": "Packaging and Documentation",
    "categoryType": "Physical",
    "mentions": 42,
    "satisfactionRate": 52.3,
    "negativeRate": 47.7,
    "positiveCount": 23,
    "negativeCount": 21,
    "totalReviews": 44,
    "averageRating": 3.59,
    "topNegativeAspects": [
      "included wall plate may not be to taste",
      "programming instructions not intuitive",
      "no English instructions provided",
      "missing instructions",
      "instructions leave out critical network connection steps"
    ],
    "topPositiveAspects": [
      "cover plate included",
      "QR code for installation video",
      "Come with matching plate covers and hardware",
      "Include plates which is cost-effective",
      "quality hardware"
    ]
  },
  {
    "category": "Button and Control Interface",
    "categoryType": "Physical",
    "mentions": 44,
    "satisfactionRate": 52.8,
    "negativeRate": 47.2,
    "positiveCount": 28,
    "negativeCount": 25,
    "totalReviews": 53,
    "averageRating": 3.79,
    "topNegativeAspects": [
      "button feels loose and cheap",
      "physical button doesn't work",
      "touch sensor may fail or not respond",
      "flimsy, wobbly, squishy button gear",
      "4 buttons with only brightest or lowest settings option"
    ],
    "topPositiveAspects": [
      "touch-sensitive control panel",
      "Capacitive touch strip for dimming",
      "button below screen for on/off control",
      "Clicky button feel",
      "punch on-off design rather than turn clockwise to turn on design"
    ]
  },
  {
    "category": "Color and Finish Options",
    "categoryType": "Physical",
    "mentions": 16,
    "satisfactionRate": 52.9,
    "negativeRate": 47.1,
    "positiveCount": 9,
    "negativeCount": 8,
    "totalReviews": 17,
    "averageRating": 3.82,
    "topNegativeAspects": [
      "Only comes in white color",
      "color is ivory, not white",
      "only white not other colors described",
      "no light almond covers in package",
      "brighter white color than other switches"
    ],
    "topPositiveAspects": [
      "comes in ivory color",
      "color exactly as in pictures",
      "good match for other wall switches",
      "comes with different colors to choose from",
      "liked the different colors you could use depending on your needs"
    ]
  },
  {
    "category": "Power Specifications",
    "categoryType": "Physical",
    "mentions": 10,
    "satisfactionRate": 53.8,
    "negativeRate": 46.2,
    "positiveCount": 7,
    "negativeCount": 6,
    "totalReviews": 13,
    "averageRating": 3.0,
    "topNegativeAspects": [
      "250W rated capacity",
      "only rated to 6amps",
      "only good for 2 lamps or bulbs with less than 15amp",
      "UL rated 250W but performance verified 150W",
      "Labeled 450W but buzzes over 200W LED"
    ],
    "topPositiveAspects": [
      "1000w capacity",
      "400 watt capacity",
      "600w capacity",
      "higher wattage capacity compared to standard 650w",
      "high wattage capacity"
    ]
  },
  {
    "category": "Color and Finish",
    "categoryType": "Physical",
    "mentions": 10,
    "satisfactionRate": 54.5,
    "negativeRate": 45.5,
    "positiveCount": 6,
    "negativeCount": 5,
    "totalReviews": 11,
    "averageRating": 4.0,
    "topNegativeAspects": [
      "received white instead of light almond",
      "very bright white plastic color that doesn't match common white",
      "Ivory color is actually almond and almond is really ivory",
      "Neither ivory nor almond colors match existing switches",
      "Brass finish has look and texture of brass spray paint"
    ],
    "topPositiveAspects": [
      "midnight satin (matte) black finish",
      "perfect color match",
      "light almond model color accurate",
      "available in many different colors",
      "Gold detail"
    ]
  },
  {
    "category": "Installation Compatibility",
    "categoryType": "Physical",
    "mentions": 13,
    "satisfactionRate": 56.2,
    "negativeRate": 43.8,
    "positiveCount": 9,
    "negativeCount": 7,
    "totalReviews": 16,
    "averageRating": 3.88,
    "topNegativeAspects": [
      "Cannot gang 2 side by side, not to U.S.A. standards",
      "switch plate smaller than standard",
      "sits higher than switch leaving it recessed",
      "Thick build causing installation issues with multi-switch outlets",
      "Bulky build not fitting small junction boxes"
    ],
    "topPositiveAspects": [
      "fits in existing switch boxes without space issues",
      "compact size fits in existing switch box",
      "fits in standard switch plate",
      "fits under normal switch cover",
      "fits in single-gang box with standard toggle switch"
    ]
  },
  {
    "category": "Magnetic Mounting",
    "categoryType": "Physical",
    "mentions": 6,
    "satisfactionRate": 57.1,
    "negativeRate": 42.9,
    "positiveCount": 4,
    "negativeCount": 3,
    "totalReviews": 7,
    "averageRating": 3.71,
    "topNegativeAspects": [
      "magnet holding to housing not as good as v1",
      "Magnet is terrible",
      "No magnets, only adhesive strips"
    ],
    "topPositiveAspects": [
      "magnetic attachment capability",
      "magnets hold remote to mount with perfect strength",
      "Magnetizes to wall holder"
    ]
  },
  {
    "category": "Knob Characteristics",
    "categoryType": "Physical",
    "mentions": 4,
    "satisfactionRate": 57.1,
    "negativeRate": 42.9,
    "positiveCount": 4,
    "negativeCount": 3,
    "totalReviews": 7,
    "averageRating": 4.14,
    "topNegativeAspects": [
      "knob sticks out from wall plate more than old dimmer",
      "knob does not snap on or lock in and can fall off easily",
      "knob post is D shaped instead of circular"
    ],
    "topPositiveAspects": [
      "comes with multiple color knobs"
    ]
  },
  {
    "category": "Slider Mechanisms",
    "categoryType": "Physical",
    "mentions": 39,
    "satisfactionRate": 58.3,
    "negativeRate": 41.7,
    "positiveCount": 28,
    "negativeCount": 20,
    "totalReviews": 48,
    "averageRating": 3.88,
    "topNegativeAspects": [
      "Dimmer slide moves too easily without resistance",
      "slider has small travel length",
      "gets very dirty when pulling up and down",
      "slide is too short",
      "slider with loose tension at bottom 2-3mm"
    ],
    "topPositiveAspects": [
      "Slider for dimming control",
      "dimmer slide",
      "slides smoothly",
      "dimmer slide stays put at setting",
      "slider doesn't move to full on when light is turned off"
    ]
  },
  {
    "category": "Hardware Components",
    "categoryType": "Physical",
    "mentions": 4,
    "satisfactionRate": 60.0,
    "negativeRate": 40.0,
    "positiveCount": 3,
    "negativeCount": 2,
    "totalReviews": 5,
    "averageRating": 2.8,
    "topNegativeAspects": [
      "missing parts/screws"
    ],
    "topPositiveAspects": [
      "hidden screws",
      "Supplied wire nuts and screws",
      "Pull tab cutoff at bottom"
    ]
  },
  {
    "category": "Switch Click and Button Feel",
    "categoryType": "Physical",
    "mentions": 5,
    "satisfactionRate": 60.0,
    "negativeRate": 40.0,
    "positiveCount": 3,
    "negativeCount": 2,
    "totalReviews": 5,
    "averageRating": 4.6,
    "topNegativeAspects": [
      "loosey-goosey click, not solid",
      "switches are noisy"
    ],
    "topPositiveAspects": [
      "crisp actuation and quality feel",
      "nice click sound",
      "good push feel"
    ]
  },
  {
    "category": "Tactile Feedback",
    "categoryType": "Physical",
    "mentions": 6,
    "satisfactionRate": 60.0,
    "negativeRate": 40.0,
    "positiveCount": 3,
    "negativeCount": 2,
    "totalReviews": 5,
    "averageRating": 3.6,
    "topNegativeAspects": [
      "clicks",
      "pronounced click when snapping into position between off and on"
    ],
    "topPositiveAspects": [
      "Has tactile and positive switch operation",
      "definite click sound for OFF setting",
      "Positive click feel"
    ]
  },
  {
    "category": "Build Durability",
    "categoryType": "Physical",
    "mentions": 10,
    "satisfactionRate": 60.0,
    "negativeRate": 40.0,
    "positiveCount": 6,
    "negativeCount": 4,
    "totalReviews": 10,
    "averageRating": 3.5,
    "topNegativeAspects": [
      "Switch cracks/breaks after 8 months to a year",
      "Switches broke in half",
      "Switch broke mechanically from normal use",
      "Broke after 3 months with minimal use"
    ],
    "topPositiveAspects": [
      "Light construction but with some durability",
      "Very well made construction",
      "feels like it will last many flips",
      "durable with six children banging on them",
      "on par with other comparable switches in the market"
    ]
  },
  {
    "category": "Switch Mechanism",
    "categoryType": "Physical",
    "mentions": 8,
    "satisfactionRate": 62.5,
    "negativeRate": 37.5,
    "positiveCount": 5,
    "negativeCount": 3,
    "totalReviews": 8,
    "averageRating": 3.5,
    "topNegativeAspects": [
      "Pivot of the rocker broke on one side",
      "Toggle switch fell apart when tried to use",
      "plastic flip switch falls out"
    ],
    "topPositiveAspects": [
      "Rocker switches for on/off",
      "positive click when turned fully off",
      "switch operation feel",
      "smooth mechanism",
      "makes slight audible click when switched"
    ]
  },
  {
    "category": "Rotary Controls",
    "categoryType": "Physical",
    "mentions": 17,
    "satisfactionRate": 62.5,
    "negativeRate": 37.5,
    "positiveCount": 15,
    "negativeCount": 9,
    "totalReviews": 24,
    "averageRating": 4.42,
    "topNegativeAspects": [
      "No push function at all, rotate to turn on and off",
      "dial is very large and bulky",
      "Large knob sticking out far",
      "has turning knob with zero resistance",
      "whole dimmer wheel assembly is oversized"
    ],
    "topPositiveAspects": [
      "Comes with three interchangeable knob colors (white, light almond, ivory)",
      "rotary style",
      "has click function for on/off",
      "White, clean appearance",
      "Twist on, NOT a push knob"
    ]
  },
  {
    "category": "Physical Dimensions and Fit",
    "categoryType": "Physical",
    "mentions": 8,
    "satisfactionRate": 62.5,
    "negativeRate": 37.5,
    "positiveCount": 5,
    "negativeCount": 3,
    "totalReviews": 8,
    "averageRating": 4.12,
    "topNegativeAspects": [
      "switch covers are smaller than hole in the wall",
      "takes up a lot more space in wall box than standard switches",
      "width and depth are considerable"
    ],
    "topPositiveAspects": [
      "not too deep, fit in electrical box",
      "compacted switch body made it easier to stuff back into crowded switch box",
      "short depth less than an inch behind mounting plate",
      "fits right into normal switch spot",
      "standard size"
    ]
  },
  {
    "category": "Build Quality and Materials",
    "categoryType": "Physical",
    "mentions": 91,
    "satisfactionRate": 62.9,
    "negativeRate": 37.1,
    "positiveCount": 66,
    "negativeCount": 39,
    "totalReviews": 105,
    "averageRating": 3.88,
    "topNegativeAspects": [
      "poor overall construction quality",
      "feel cheap",
      "feels cheaply made with brittle plastic",
      "cheap construction",
      "cheap feeling overall"
    ],
    "topPositiveAspects": [
      "feels well built and solid",
      "well made",
      "Well made build quality",
      "well built",
      "quality construction"
    ]
  },
  {
    "category": "Wiring Configuration and Connections",
    "categoryType": "Physical",
    "mentions": 113,
    "satisfactionRate": 64.2,
    "negativeRate": 35.8,
    "positiveCount": 106,
    "negativeCount": 59,
    "totalReviews": 165,
    "averageRating": 3.95,
    "topNegativeAspects": [
      "does not have wire leads attached",
      "requires neutral wire connection",
      "no ground connection, only 2 prong",
      "requires_separate_neutral_wire",
      "has short in wiring"
    ],
    "topPositiveAspects": [
      "requires neutral wire",
      "Requires neutral wire",
      "no neutral wire required",
      "does not require neutral wire",
      "Stranded wire leads instead of terminals"
    ]
  },
  {
    "category": "Build Quality and Construction",
    "categoryType": "Physical",
    "mentions": 10,
    "satisfactionRate": 64.3,
    "negativeRate": 35.7,
    "positiveCount": 9,
    "negativeCount": 5,
    "totalReviews": 14,
    "averageRating": 3.86,
    "topNegativeAspects": [
      "Flimsy construction compared to older switches",
      "Loose connectors",
      "Left-handed screws not extending far enough",
      "Low quality switch",
      "Cheaply made"
    ],
    "topPositiveAspects": [
      "well made",
      "high build quality",
      "Solid construction",
      "Well made",
      "Seems sturdier than previous switch"
    ]
  },
  {
    "category": "Adjustment Wheels",
    "categoryType": "Physical",
    "mentions": 9,
    "satisfactionRate": 66.7,
    "negativeRate": 33.3,
    "positiveCount": 8,
    "negativeCount": 4,
    "totalReviews": 12,
    "averageRating": 3.83,
    "topNegativeAspects": [
      "adjustment wheel doesn't change much",
      "calibration adjustment requires switch plate removal",
      "missing dimming range lever despite being advertised",
      "internal dimmer adjustment immovable and factory set"
    ],
    "topPositiveAspects": [
      "small adjustment wheel for calibration",
      "Low limit adjustment wheel allows setting lowest level for custom range",
      "Second adjustment helps with dimming range",
      "Fine tuning adjustment on top of brightness adjustment",
      "Adjustable minimum brightness setting"
    ]
  },
  {
    "category": "Included Components and Accessories",
    "categoryType": "Physical",
    "mentions": 3,
    "satisfactionRate": 66.7,
    "negativeRate": 33.3,
    "positiveCount": 2,
    "negativeCount": 1,
    "totalReviews": 3,
    "averageRating": 5.0,
    "topNegativeAspects": [
      "Did not come with plate screws"
    ],
    "topPositiveAspects": [
      "Comes with dimmer plate",
      "Comes with all wireless connectors needed"
    ]
  },
  {
    "category": "Internal Components",
    "categoryType": "Physical",
    "mentions": 6,
    "satisfactionRate": 66.7,
    "negativeRate": 33.3,
    "positiveCount": 4,
    "negativeCount": 2,
    "totalReviews": 6,
    "averageRating": 3.67,
    "topNegativeAspects": [
      "plastic toggle and slider is thin",
      "missing part internally"
    ],
    "topPositiveAspects": [
      "has switch underneath face plate to change INC to LED",
      "switch had four small screws that allowed access to internal parts",
      "adjustable setting on internal face",
      "little plastic clip at bottom"
    ]
  },
  {
    "category": "Specialized Features",
    "categoryType": "Physical",
    "mentions": 3,
    "satisfactionRate": 66.7,
    "negativeRate": 33.3,
    "positiveCount": 2,
    "negativeCount": 1,
    "totalReviews": 3,
    "averageRating": 2.33,
    "topNegativeAspects": [
      "Flimsy and imprecise flicker control"
    ],
    "topPositiveAspects": [
      "Adjustable wheel for configuration",
      "Adjustment dial functionality"
    ]
  },
  {
    "category": "Faceplate and Cover Components",
    "categoryType": "Physical",
    "mentions": 26,
    "satisfactionRate": 68.4,
    "negativeRate": 31.6,
    "positiveCount": 26,
    "negativeCount": 12,
    "totalReviews": 38,
    "averageRating": 4.29,
    "topNegativeAspects": [
      "visible 2-piece design",
      "cover comes off easily",
      "face plates slightly flimsy",
      "trim plate may be narrow for older homes",
      "Forced to use ugly oversized plate"
    ],
    "topPositiveAspects": [
      "decorative plate included",
      "comes with wall plate included",
      "screwless wall plate design",
      "screw free wall plate",
      "screwless cover plate"
    ]
  },
  {
    "category": "Slider Controls",
    "categoryType": "Physical",
    "mentions": 27,
    "satisfactionRate": 68.6,
    "negativeRate": 31.4,
    "positiveCount": 24,
    "negativeCount": 11,
    "totalReviews": 35,
    "averageRating": 4.17,
    "topNegativeAspects": [
      "stiff slider movement",
      "slider motion feels like grinding",
      "detent has harder slide feel compared to older versions",
      "detent used to have smooth feel in older versions",
      "very tiny dimmer slider"
    ],
    "topPositiveAspects": [
      "smooth and responsive slider",
      "large dimmer slider size",
      "slider movement smoothness",
      "easy to move slide bar",
      "Has thumbwheel dial under cover for adjustment"
    ]
  },
  {
    "category": "Specialized Components",
    "categoryType": "Physical",
    "mentions": 12,
    "satisfactionRate": 68.8,
    "negativeRate": 31.2,
    "positiveCount": 11,
    "negativeCount": 5,
    "totalReviews": 16,
    "averageRating": 3.62,
    "topNegativeAspects": [
      "Batteries dead on arrival",
      "pull plug under paddle is longer in new model compared to older ones",
      "Air gap plug under paddle that spontaneously pops out and cannot be reinserted",
      "dimmer installed upside down with high at bottom and low at top",
      "has little metal heat sink fins on the sides"
    ],
    "topPositiveAspects": [
      "adjustment_lever_on_body_for_minimum_dim_setting",
      "Air gap reset feature",
      "Battery powered",
      "IP44 weather resistance rating",
      "better cooling profile than metal fin switches"
    ]
  },
  {
    "category": "Switch Actuation Mechanism",
    "categoryType": "Physical",
    "mentions": 49,
    "satisfactionRate": 69.6,
    "negativeRate": 30.4,
    "positiveCount": 55,
    "negativeCount": 24,
    "totalReviews": 79,
    "averageRating": 4.03,
    "topNegativeAspects": [
      "Touch sensor interface for dimming control",
      "Physical button for on/off operation",
      "horizontal toggle can be confusing",
      "both ends are just clicking buttons, not real switching",
      "toggle feels soft with no solid clicking"
    ],
    "topPositiveAspects": [
      "Rocker switch with side slider design",
      "slider control mechanism",
      "Touch sensor interface for dimming control",
      "Features old school toggle-only design without side slider",
      "toggle functionality"
    ]
  },
  {
    "category": "Build Construction",
    "categoryType": "Physical",
    "mentions": 30,
    "satisfactionRate": 71.4,
    "negativeRate": 28.6,
    "positiveCount": 25,
    "negativeCount": 10,
    "totalReviews": 35,
    "averageRating": 4.11,
    "topNegativeAspects": [
      "Poor build quality with gaps developing",
      "Feels very low quality",
      "Cheaply made",
      "Physically coming apart",
      "feels cheap"
    ],
    "topPositiveAspects": [
      "Good quality",
      "well made and sturdy construction",
      "solidly built",
      "seems well-made",
      "not flimsy"
    ]
  },
  {
    "category": "Touch Interface",
    "categoryType": "Physical",
    "mentions": 5,
    "satisfactionRate": 71.4,
    "negativeRate": 28.6,
    "positiveCount": 5,
    "negativeCount": 2,
    "totalReviews": 7,
    "averageRating": 4.29,
    "topNegativeAspects": [
      "Touch plate for dimming seems awkward - causes unintended dimming level changes",
      "Physical dimmer feature is hit or miss - sometimes registers touch, sometimes doesn't"
    ],
    "topPositiveAspects": [
      "touch-activated button interface",
      "Can slide finger instead of clicking for dimming",
      "Switch responds well to touch"
    ]
  },
  {
    "category": "Slider Functionality",
    "categoryType": "Physical",
    "mentions": 20,
    "satisfactionRate": 71.4,
    "negativeRate": 28.6,
    "positiveCount": 20,
    "negativeCount": 8,
    "totalReviews": 28,
    "averageRating": 4.0,
    "topNegativeAspects": [
      "Sliders stick and are very difficult to move",
      "Slider jams and cannot be moved",
      "Dimmer adjuster is not built well",
      "sensitive in the middle range",
      "not uniform in brightness application"
    ],
    "topPositiveAspects": [
      "Smooth slider operation",
      "smooth_operation",
      "Easy to use slider",
      "Slider is smooth",
      "Broader slide"
    ]
  },
  {
    "category": "Physical Size and Fit",
    "categoryType": "Physical",
    "mentions": 15,
    "satisfactionRate": 73.3,
    "negativeRate": 26.7,
    "positiveCount": 11,
    "negativeCount": 4,
    "totalReviews": 15,
    "averageRating": 4.6,
    "topNegativeAspects": [
      "smaller than existing plate showing drywall gap",
      "takes up a lot of space in the outlet box",
      "large size making it difficult to fit in boxes with many wires",
      "hard to install in regular wall box especially with multiple switches"
    ],
    "topPositiveAspects": [
      "not too bulky, easy to fit into box",
      "doesn't take up much space inside switch box",
      "Shallow depth fitting in one inch box",
      "Low profile design",
      "Compact size fitting well in junction box"
    ]
  },
  {
    "category": "Component Accessories",
    "categoryType": "Physical",
    "mentions": 22,
    "satisfactionRate": 73.5,
    "negativeRate": 26.5,
    "positiveCount": 36,
    "negativeCount": 13,
    "totalReviews": 49,
    "averageRating": 4.31,
    "topNegativeAspects": [
      "no_wire_nuts_included",
      "Bulb adapter requirement for generic LED bulbs",
      "came with no wire nuts",
      "kit lacks bracket required to mount Pico remote",
      "included cheap wire nuts"
    ],
    "topPositiveAspects": [
      "multiple color options with swappable parts in the box",
      "Wire nuts provided",
      "comes with 3 different color face plates (white, almond, beige)",
      "Labels for wiring included",
      "Snap-on cover plate included"
    ]
  },
  {
    "category": "Manufacturing Origin",
    "categoryType": "Physical",
    "mentions": 4,
    "satisfactionRate": 75.0,
    "negativeRate": 25.0,
    "positiveCount": 3,
    "negativeCount": 1,
    "totalReviews": 4,
    "averageRating": 1.75,
    "topNegativeAspects": [
      "Chinese garbage, not made in North America"
    ],
    "topPositiveAspects": [
      "made in Mexico",
      "labeled \"Assembled in Mexico\"",
      "labeled \"Made in China\""
    ]
  },
  {
    "category": "Touchscreen Interface",
    "categoryType": "Physical",
    "mentions": 10,
    "satisfactionRate": 75.0,
    "negativeRate": 25.0,
    "positiveCount": 12,
    "negativeCount": 4,
    "totalReviews": 16,
    "averageRating": 4.25,
    "topNegativeAspects": [
      "screen becomes blank and unresponsive",
      "screen is frozen but still works via app",
      "screen is laggy and unacceptable",
      "touchscreen button stopped working"
    ],
    "topPositiveAspects": [
      "display shows time and weather",
      "Touch screen interface",
      "display quality is great",
      "touchscreen is responsive",
      "display is clear and bright"
    ]
  },
  {
    "category": "Visual Indicator Lights",
    "categoryType": "Physical",
    "mentions": 19,
    "satisfactionRate": 75.8,
    "negativeRate": 24.2,
    "positiveCount": 25,
    "negativeCount": 8,
    "totalReviews": 33,
    "averageRating": 4.12,
    "topNegativeAspects": [
      "Light ring indicator",
      "has LED indicator lights",
      "satellite switch lacks dimmer indicator lights",
      "Green LEDs are configurable but can't change the color",
      "LED status light is not as bright on Amazon switches"
    ],
    "topPositiveAspects": [
      "LED light indicator on dimmer slide",
      "Small LED indicator light that can be turned on or off",
      "has LED indicator lights",
      "has green indicator light to find in dark",
      "Green LED indicator light"
    ]
  },
  {
    "category": "LED Indicator and Lighting Features",
    "categoryType": "Physical",
    "mentions": 45,
    "satisfactionRate": 77.6,
    "negativeRate": 22.4,
    "positiveCount": 52,
    "negativeCount": 15,
    "totalReviews": 67,
    "averageRating": 4.31,
    "topNegativeAspects": [
      "blue indicator light",
      "Built-in LEDs are very bright in dark room",
      "LED indicator off setting does not turn off brightness level LEDs",
      "Only shows tiny white LED at brightness setting when off",
      "Light on switch is really bright and irritating in dark room"
    ],
    "topPositiveAspects": [
      "LED light bar illuminates for easy to find switch in darkness",
      "LED light bar shows dimness level set",
      "small locator LED",
      "LED indicators on switch",
      "blue indicator light"
    ]
  },
  {
    "category": "Specialized Controls",
    "categoryType": "Physical",
    "mentions": 31,
    "satisfactionRate": 79.6,
    "negativeRate": 20.4,
    "positiveCount": 39,
    "negativeCount": 10,
    "totalReviews": 49,
    "averageRating": 4.24,
    "topNegativeAspects": [
      "don't like having to remove cover to dial up or down",
      "adjustment wheel does nothing",
      "small wheel to set lowest setting does not appear to do much",
      "round dial on right side with no luck adjusting",
      "dimmer range control not visible or accessible after installing cover plate"
    ],
    "topPositiveAspects": [
      "Calibration button for adjusting dimming range",
      "Burst mode feature",
      "Internal adjustment knob for brightness control",
      "has adjustment screw for tuning dimmer",
      "adjustable thumb wheel"
    ]
  },
  {
    "category": "Color Options",
    "categoryType": "Physical",
    "mentions": 3,
    "satisfactionRate": 80.0,
    "negativeRate": 20.0,
    "positiveCount": 4,
    "negativeCount": 1,
    "totalReviews": 5,
    "averageRating": 4.0,
    "topNegativeAspects": [
      "only comes with white switch cover/faceplate"
    ],
    "topPositiveAspects": [
      "three different faceplate color options",
      "Home Depot packaging includes color change plates"
    ]
  },
  {
    "category": "Adjustment Controls",
    "categoryType": "Physical",
    "mentions": 4,
    "satisfactionRate": 80.0,
    "negativeRate": 20.0,
    "positiveCount": 8,
    "negativeCount": 2,
    "totalReviews": 10,
    "averageRating": 3.8,
    "topNegativeAspects": [
      "adjustment wheel component"
    ],
    "topPositiveAspects": [
      "blue adjustment range toggle",
      "adjustment wheel component",
      "little dial inside the cover to set minimum brightness",
      "dimmer adjustment is on the bottom"
    ]
  },
  {
    "category": "Electrical Wiring",
    "categoryType": "Physical",
    "mentions": 17,
    "satisfactionRate": 81.1,
    "negativeRate": 18.9,
    "positiveCount": 30,
    "negativeCount": 7,
    "totalReviews": 37,
    "averageRating": 4.19,
    "topNegativeAspects": [
      "Pre-wired braided copper pigtails",
      "requires both hot and neutral wires",
      "requires ground wire",
      "Five wire nuts and leads to make fit in box",
      "Wire leads instead of wire terminals"
    ],
    "topPositiveAspects": [
      "No neutral wire requirement",
      "Does not require neutral wire",
      "works without neutral wire",
      "three-way switch capability",
      "can handle SPST, 3 Way and 4 way wiring"
    ]
  },
  {
    "category": "Wiring Terminals",
    "categoryType": "Physical",
    "mentions": 6,
    "satisfactionRate": 85.7,
    "negativeRate": 14.3,
    "positiveCount": 6,
    "negativeCount": 1,
    "totalReviews": 7,
    "averageRating": 4.0,
    "topNegativeAspects": [
      "twist-wire connections with no push-in wiring option"
    ],
    "topPositiveAspects": [
      "screw terminals instead of wire connections",
      "back-wiring capability",
      "has wires not screw in",
      "uses pigtails compared to screw terminals",
      "Comes with wires attached"
    ]
  },
  {
    "category": "Visual Appearance and Aesthetics",
    "categoryType": "Physical",
    "mentions": 118,
    "satisfactionRate": 86.7,
    "negativeRate": 13.3,
    "positiveCount": 130,
    "negativeCount": 20,
    "totalReviews": 150,
    "averageRating": 4.37,
    "topNegativeAspects": [
      "not the prettiest design",
      "Paint on the switch",
      "Color not as pictured",
      "Hard to find color in brick and mortar stores",
      "ugly appearance"
    ],
    "topPositiveAspects": [
      "looks nice",
      "available in black color",
      "looks nice and modern",
      "nice design",
      "modern elegant look"
    ]
  },
  {
    "category": "Switch Plate Design",
    "categoryType": "Physical",
    "mentions": 13,
    "satisfactionRate": 87.5,
    "negativeRate": 12.5,
    "positiveCount": 14,
    "negativeCount": 2,
    "totalReviews": 16,
    "averageRating": 4.62,
    "topNegativeAspects": [
      "upside down orientation marking"
    ],
    "topPositiveAspects": [
      "Classic paddle design with soft-glow light bar",
      "Traditional rocker switch appearance",
      "full width rocker switch",
      "paddle switch design preferred over button style",
      "Paddle style matches other switches in house"
    ]
  },
  {
    "category": "Multi-Switch Configuration",
    "categoryType": "Physical",
    "mentions": 11,
    "satisfactionRate": 96.0,
    "negativeRate": 4.0,
    "positiveCount": 24,
    "negativeCount": 1,
    "totalReviews": 25,
    "averageRating": 4.64,
    "topNegativeAspects": [
      "fan switch side has 3 specific speeds"
    ],
    "topPositiveAspects": [
      "dual dimmer in single switch box position",
      "space-saving design",
      "separate on/off switch from dimmer",
      "2-in-1 control feature",
      "has large on/off switch and dimmer for accessibility"
    ]
  },
  {
    "category": "Visual Appearance",
    "categoryType": "Physical",
    "mentions": 55,
    "satisfactionRate": 96.1,
    "negativeRate": 3.9,
    "positiveCount": 73,
    "negativeCount": 3,
    "totalReviews": 76,
    "averageRating": 4.64,
    "topNegativeAspects": [
      "design puts features before usability",
      "Looks off to the rear of the switches",
      "plain jane variety with no soft on/off or led display"
    ],
    "topPositiveAspects": [
      "looks great",
      "looks good",
      "modern and sleek design",
      "Modern appearance",
      "Looks great"
    ]
  },
  {
    "category": "Visual Aesthetics",
    "categoryType": "Physical",
    "mentions": 63,
    "satisfactionRate": 97.5,
    "negativeRate": 2.5,
    "positiveCount": 78,
    "negativeCount": 2,
    "totalReviews": 80,
    "averageRating": 4.6,
    "topNegativeAspects": [
      "looks cheap",
      "looks bad"
    ],
    "topPositiveAspects": [
      "clean and modern looking",
      "Sleek and modern appearance",
      "Nice looking appearance",
      "sleek appearance",
      "elegant and sleek design"
    ]
  },
  {
    "category": "Mounting Hardware",
    "categoryType": "Physical",
    "mentions": 2,
    "satisfactionRate": 100.0,
    "negativeRate": 0.0,
    "positiveCount": 2,
    "negativeCount": 0,
    "totalReviews": 2,
    "averageRating": 5.0,
    "topNegativeAspects": [],
    "topPositiveAspects": [
      "wall mount with screw option or 3M adhesive",
      "stick on plate for convenient install"
    ]
  },
  {
    "category": "LED Indicators",
    "categoryType": "Physical",
    "mentions": 5,
    "satisfactionRate": 100.0,
    "negativeRate": 0.0,
    "positiveCount": 6,
    "negativeCount": 0,
    "totalReviews": 6,
    "averageRating": 4.5,
    "topNegativeAspects": [],
    "topPositiveAspects": [
      "small LED indicator dot",
      "pinpoint LED light to illuminate switch location",
      "LED bright enough to see in dark but not eyesore",
      "locator light when switch is turned off is very dim",
      "small circle light that illuminates when switch is off for visibility in dark"
    ]
  },
  {
    "category": "Visual Design",
    "categoryType": "Performance",
    "mentions": 4,
    "satisfactionRate": 100.0,
    "negativeRate": 0.0,
    "positiveCount": 3,
    "negativeCount": 0,
    "totalReviews": 3,
    "averageRating": 5.0,
    "topNegativeAspects": [],
    "topPositiveAspects": [
      "push top to turn on, bottom to turn off switch with dimmer adjustment on the right",
      "face plate makes the product look amazing",
      "homekit code on the switch"
    ]
  },
  {
    "category": "Illumination Features",
    "categoryType": "Physical",
    "mentions": 2,
    "satisfactionRate": 100.0,
    "negativeRate": 0.0,
    "positiveCount": 2,
    "negativeCount": 0,
    "totalReviews": 2,
    "averageRating": 3.5,
    "topNegativeAspects": [],
    "topPositiveAspects": [
      "has locator light",
      "has_locator_light_for_dark_visibility"
    ]
  },
  {
    "category": "Touch and Capacitive Features",
    "categoryType": "Physical",
    "mentions": 4,
    "satisfactionRate": 100.0,
    "negativeRate": 0.0,
    "positiveCount": 4,
    "negativeCount": 0,
    "totalReviews": 4,
    "averageRating": 4.0,
    "topNegativeAspects": [],
    "topPositiveAspects": [
      "touch sensor requires bare skin contact",
      "capacitive touch feature",
      "feels like phone touchscreen when adjusting light",
      "vertical touch sensor in the middle of the switch"
    ]
  },
  {
    "category": "Screw Quality and Fit",
    "categoryType": "Physical",
    "mentions": 1,
    "satisfactionRate": 100.0,
    "negativeRate": 0.0,
    "positiveCount": 1,
    "negativeCount": 0,
    "totalReviews": 1,
    "averageRating": 5.0,
    "topNegativeAspects": [],
    "topPositiveAspects": [
      "screws firmly attached"
    ]
  },
  {
    "category": "Switch Shape Design",
    "categoryType": "Physical",
    "mentions": 5,
    "satisfactionRate": 100.0,
    "negativeRate": 0.0,
    "positiveCount": 10,
    "negativeCount": 0,
    "totalReviews": 10,
    "averageRating": 4.7,
    "topNegativeAspects": [],
    "topPositiveAspects": [
      "Slim/thin profile",
      "Lightweight construction",
      "has hourglass shape",
      "has paddle shape that is unusual but not unattractive",
      "has large switch"
    ]
  },
  {
    "category": "LED Illumination",
    "categoryType": "Physical",
    "mentions": 2,
    "satisfactionRate": 100.0,
    "negativeRate": 0.0,
    "positiveCount": 2,
    "negativeCount": 0,
    "totalReviews": 2,
    "averageRating": 4.5,
    "topNegativeAspects": [],
    "topPositiveAspects": [
      "small built in LED night light",
      "provides visibility in low-light conditions"
    ]
  },
  {
    "category": "Product Certification",
    "categoryType": "Physical",
    "mentions": 2,
    "satisfactionRate": 100.0,
    "negativeRate": 0.0,
    "positiveCount": 2,
    "negativeCount": 0,
    "totalReviews": 2,
    "averageRating": 4.5,
    "topNegativeAspects": [],
    "topPositiveAspects": [
      "UL approved",
      "has UL rating printed on metal part"
    ]
  },
  {
    "category": "Tactile Operation Feel",
    "categoryType": "Physical",
    "mentions": 2,
    "satisfactionRate": 100.0,
    "negativeRate": 0.0,
    "positiveCount": 2,
    "negativeCount": 0,
    "totalReviews": 2,
    "averageRating": 5.0,
    "topNegativeAspects": [],
    "topPositiveAspects": [
      "feels better when you turn the knob",
      "clicks very smoothly when turned on or off"
    ]
  }
];

// Light Switches 数据
export const lightSwitchesSummary = {
  "totalCategories": 101,
  "physicalCategories": 97,
  "performanceCategories": 4,
  "avgSatisfactionRate": 47.5,
  "processingDate": "2025-06-10T18:28:25.613059",
  "productType": "Light Switches"
};
export const topNegativeLightCategories: CategoryFeedback[] = [
  {
    "category": "LED Indicator and Lighting Features",
    "categoryType": "Physical",
    "mentions": 96,
    "satisfactionRate": 52.9,
    "negativeRate": 47.1,
    "positiveCount": 118,
    "negativeCount": 105,
    "totalReviews": 223,
    "averageRating": 3.7,
    "topNegativeAspects": [
      "very dim brightness",
      "very dim and barely visible",
      "dim/low light emission",
      "LED lights fail or stop working",
      "LED lights illuminate upward"
    ],
    "topPositiveAspects": [
      "LED light component that illuminates the switch",
      "LED lights provide illumination when switch is off",
      "Light brightness level",
      "Has LED indicator light",
      "White/clear light color"
    ]
  },
  {
    "category": "Visual Appearance and Aesthetics",
    "categoryType": "Physical",
    "mentions": 104,
    "satisfactionRate": 67.3,
    "negativeRate": 32.7,
    "positiveCount": 101,
    "negativeCount": 49,
    "totalReviews": 150,
    "averageRating": 3.77,
    "topNegativeAspects": [
      "embossed LEVITON logo on bottom left corner",
      "Vendor name stamped into the plate",
      "raised LEVITON letters on face",
      "color does not match other BESTTEN switches",
      "does not match own outlets/cover plates"
    ],
    "topPositiveAspects": [
      "nice looking",
      "attractive visual appearance",
      "looks nice and modern",
      "good appearance",
      "modern look"
    ]
  },
  {
    "category": "Wiring Configuration and Connections",
    "categoryType": "Physical",
    "mentions": 100,
    "satisfactionRate": 61.2,
    "negativeRate": 38.8,
    "positiveCount": 74,
    "negativeCount": 47,
    "totalReviews": 121,
    "averageRating": 4.01,
    "topNegativeAspects": [
      "requires neutral wire",
      "short wire length",
      "requires neutral wire for operation",
      "thin wire gauge",
      "16 gauge wires on transmitter"
    ],
    "topPositiveAspects": [
      "Requires neutral wire connection for nightlight to work",
      "requires neutral wire for light",
      "requires neutral wire",
      "Has connection hole under screw head for wire insertion",
      "requires neutral wire connection"
    ]
  },
  {
    "category": "Build Quality and Materials",
    "categoryType": "Physical",
    "mentions": 123,
    "satisfactionRate": 77.8,
    "negativeRate": 22.2,
    "positiveCount": 144,
    "negativeCount": 41,
    "totalReviews": 185,
    "averageRating": 4.28,
    "topNegativeAspects": [
      "Cheaply made",
      "low build quality",
      "cheaply made",
      "cheaply built",
      "cheap construction quality"
    ],
    "topPositiveAspects": [
      "Good quality construction",
      "well made",
      "good quality",
      "Solid construction",
      "well made construction"
    ]
  },
  {
    "category": "Size and Fit",
    "categoryType": "Physical",
    "mentions": 61,
    "satisfactionRate": 61.5,
    "negativeRate": 38.5,
    "positiveCount": 48,
    "negativeCount": 30,
    "totalReviews": 78,
    "averageRating": 4.29,
    "topNegativeAspects": [
      "Larger than standard non-smart switch",
      "large back/housing that is difficult to fit in electrical boxes",
      "receiver is somewhat large",
      "large physical dimensions causing fit issues in electrical boxes",
      "deep/large size requiring spacious wall boxes"
    ],
    "topPositiveAspects": [
      "space-saving design that fits two 3-way switches in one gang box",
      "compact single gang size for three switches",
      "perfect fit",
      "1 gang standard size matching US household switches",
      "larger than normal switch, takes more room in electrical box"
    ]
  },
  {
    "category": "Packaging and Documentation",
    "categoryType": "Physical",
    "mentions": 30,
    "satisfactionRate": 27.8,
    "negativeRate": 72.2,
    "positiveCount": 10,
    "negativeCount": 26,
    "totalReviews": 36,
    "averageRating": 3.33,
    "topNegativeAspects": [
      "small print, hard to read instructions",
      "covers come together as one unit instead of separate individual covers",
      "no instructions included",
      "sub-standard quality",
      "do not make neutral wire requirement clear"
    ],
    "topPositiveAspects": [
      "easy to understand instructions",
      "clear wiring directions and labeling",
      "wire lever nuts included",
      "high quality packaging",
      "impressed with packaging"
    ]
  },
  {
    "category": "Wire Connection Mechanisms",
    "categoryType": "Physical",
    "mentions": 39,
    "satisfactionRate": 40.5,
    "negativeRate": 59.5,
    "positiveCount": 17,
    "negativeCount": 25,
    "totalReviews": 42,
    "averageRating": 3.17,
    "topNegativeAspects": [
      "Screws do not go back in once removed",
      "flimsy terminals that never tighten up properly",
      "tight plug insertion requiring force",
      "Only accommodates one wire per connection",
      "Push-in wire slots not holding, slipping back out"
    ],
    "topPositiveAspects": [
      "screw terminals available",
      "Made for back wiring",
      "14 AWG wires slide into back easily",
      "12 AWG wires need to be screwed to side mount screws",
      "push-in holes rated for 14 gauge wire"
    ]
  },
  {
    "category": "Physical Durability",
    "categoryType": "Physical",
    "mentions": 33,
    "satisfactionRate": 0.0,
    "negativeRate": 100.0,
    "positiveCount": 0,
    "negativeCount": 24,
    "totalReviews": 24,
    "averageRating": 1.58,
    "topNegativeAspects": [
      "Switch breaks or fails mechanically",
      "buttons break easily",
      "paddle that pops out",
      "rocker switch stuck to on position",
      "switches broken and flopped in seat"
    ],
    "topPositiveAspects": []
  },
  {
    "category": "Color and Finish Options",
    "categoryType": "Physical",
    "mentions": 34,
    "satisfactionRate": 69.2,
    "negativeRate": 30.8,
    "positiveCount": 45,
    "negativeCount": 20,
    "totalReviews": 65,
    "averageRating": 4.02,
    "topNegativeAspects": [
      "Yellow appearance instead of gold",
      "white color instead of light almond",
      "doesn't match existing switches",
      "Matte finish looks and feels like unfinished plastic",
      "not real white"
    ],
    "topPositiveAspects": [
      "gray color matches well with other brands and fixtures",
      "Gold color appearance",
      "black color",
      "brown color available",
      "Brushed gold finish"
    ]
  },
  {
    "category": "Packaging Quality",
    "categoryType": "Physical",
    "mentions": 31,
    "satisfactionRate": 42.4,
    "negativeRate": 57.6,
    "positiveCount": 14,
    "negativeCount": 19,
    "totalReviews": 33,
    "averageRating": 3.39,
    "topNegativeAspects": [
      "arrived with crud/fingerprints that couldn't be cleaned",
      "Switches arrived broken",
      "Missing small screws for cover plate",
      "box crushed",
      "appears to have been previously used"
    ],
    "topPositiveAspects": [
      "Switch was packaged well and protected",
      "come individually wrapped",
      "well packaged",
      "packaged well",
      "individually packaged"
    ]
  }
];
export const topPositiveLightCategories: CategoryFeedback[] = [
  {
    "category": "Build Quality and Materials",
    "categoryType": "Physical",
    "mentions": 123,
    "satisfactionRate": 77.8,
    "negativeRate": 22.2,
    "positiveCount": 144,
    "negativeCount": 41,
    "totalReviews": 185,
    "averageRating": 4.28,
    "topNegativeAspects": [
      "Cheaply made",
      "low build quality",
      "cheaply made",
      "cheaply built",
      "cheap construction quality"
    ],
    "topPositiveAspects": [
      "Good quality construction",
      "well made",
      "good quality",
      "Solid construction",
      "well made construction"
    ]
  },
  {
    "category": "Visual Aesthetics",
    "categoryType": "Physical",
    "mentions": 86,
    "satisfactionRate": 96.9,
    "negativeRate": 3.1,
    "positiveCount": 124,
    "negativeCount": 4,
    "totalReviews": 128,
    "averageRating": 4.75,
    "topNegativeAspects": [
      "Lacks metallic quality",
      "company name impressed into plastic",
      "look-and-feel of original Caseta dimmers"
    ],
    "topPositiveAspects": [
      "Nice looking/beautiful appearance",
      "Modern and clean look",
      "looks great and modern style",
      "clean look",
      "attractive and modern looking"
    ]
  },
  {
    "category": "LED Indicator and Lighting Features",
    "categoryType": "Physical",
    "mentions": 96,
    "satisfactionRate": 52.9,
    "negativeRate": 47.1,
    "positiveCount": 118,
    "negativeCount": 105,
    "totalReviews": 223,
    "averageRating": 3.7,
    "topNegativeAspects": [
      "very dim brightness",
      "very dim and barely visible",
      "dim/low light emission",
      "LED lights fail or stop working",
      "LED lights illuminate upward"
    ],
    "topPositiveAspects": [
      "LED light component that illuminates the switch",
      "LED lights provide illumination when switch is off",
      "Light brightness level",
      "Has LED indicator light",
      "White/clear light color"
    ]
  },
  {
    "category": "Visual Appearance and Aesthetics",
    "categoryType": "Physical",
    "mentions": 104,
    "satisfactionRate": 67.3,
    "negativeRate": 32.7,
    "positiveCount": 101,
    "negativeCount": 49,
    "totalReviews": 150,
    "averageRating": 3.77,
    "topNegativeAspects": [
      "embossed LEVITON logo on bottom left corner",
      "Vendor name stamped into the plate",
      "raised LEVITON letters on face",
      "color does not match other BESTTEN switches",
      "does not match own outlets/cover plates"
    ],
    "topPositiveAspects": [
      "nice looking",
      "attractive visual appearance",
      "looks nice and modern",
      "good appearance",
      "modern look"
    ]
  },
  {
    "category": "Wiring Configuration and Connections",
    "categoryType": "Physical",
    "mentions": 100,
    "satisfactionRate": 61.2,
    "negativeRate": 38.8,
    "positiveCount": 74,
    "negativeCount": 47,
    "totalReviews": 121,
    "averageRating": 4.01,
    "topNegativeAspects": [
      "requires neutral wire",
      "short wire length",
      "requires neutral wire for operation",
      "thin wire gauge",
      "16 gauge wires on transmitter"
    ],
    "topPositiveAspects": [
      "Requires neutral wire connection for nightlight to work",
      "requires neutral wire for light",
      "requires neutral wire",
      "Has connection hole under screw head for wire insertion",
      "requires neutral wire connection"
    ]
  },
  {
    "category": "Size and Fit",
    "categoryType": "Physical",
    "mentions": 61,
    "satisfactionRate": 61.5,
    "negativeRate": 38.5,
    "positiveCount": 48,
    "negativeCount": 30,
    "totalReviews": 78,
    "averageRating": 4.29,
    "topNegativeAspects": [
      "Larger than standard non-smart switch",
      "large back/housing that is difficult to fit in electrical boxes",
      "receiver is somewhat large",
      "large physical dimensions causing fit issues in electrical boxes",
      "deep/large size requiring spacious wall boxes"
    ],
    "topPositiveAspects": [
      "space-saving design that fits two 3-way switches in one gang box",
      "compact single gang size for three switches",
      "perfect fit",
      "1 gang standard size matching US household switches",
      "larger than normal switch, takes more room in electrical box"
    ]
  },
  {
    "category": "Color and Finish Options",
    "categoryType": "Physical",
    "mentions": 34,
    "satisfactionRate": 69.2,
    "negativeRate": 30.8,
    "positiveCount": 45,
    "negativeCount": 20,
    "totalReviews": 65,
    "averageRating": 4.02,
    "topNegativeAspects": [
      "Yellow appearance instead of gold",
      "white color instead of light almond",
      "doesn't match existing switches",
      "Matte finish looks and feels like unfinished plastic",
      "not real white"
    ],
    "topPositiveAspects": [
      "gray color matches well with other brands and fixtures",
      "Gold color appearance",
      "black color",
      "brown color available",
      "Brushed gold finish"
    ]
  },
  {
    "category": "Visual Appearance",
    "categoryType": "Physical",
    "mentions": 41,
    "satisfactionRate": 97.4,
    "negativeRate": 2.6,
    "positiveCount": 37,
    "negativeCount": 1,
    "totalReviews": 38,
    "averageRating": 4.53,
    "topNegativeAspects": [
      "not aesthetically pleasing"
    ],
    "topPositiveAspects": [
      "looks great",
      "looks good",
      "Looks great",
      "modern appearance",
      "sleek decorator-style design"
    ]
  },
  {
    "category": "Construction Quality",
    "categoryType": "Physical",
    "mentions": 27,
    "satisfactionRate": 91.9,
    "negativeRate": 8.1,
    "positiveCount": 34,
    "negativeCount": 3,
    "totalReviews": 37,
    "averageRating": 4.62,
    "topNegativeAspects": [
      "designed bend lines from fabrication",
      "plastic molded with side clips",
      "not real sturdy but good enough"
    ],
    "topPositiveAspects": [
      "Quality construction",
      "solid and sturdy feel",
      "Well constructed",
      "well constructed",
      "Well-made construction"
    ]
  },
  {
    "category": "LED Illumination Performance",
    "categoryType": "Physical",
    "mentions": 16,
    "satisfactionRate": 54.8,
    "negativeRate": 45.2,
    "positiveCount": 23,
    "negativeCount": 19,
    "totalReviews": 42,
    "averageRating": 3.74,
    "topNegativeAspects": [
      "Not bright enough/dim illumination",
      "Brightness level varies from very bright to extremely dim",
      "Illumination fails after short period of use",
      "Non-uniform light distribution with shadows",
      "Always illuminated without adjustment"
    ],
    "topPositiveAspects": [
      "Brightness level varies from very bright to extremely dim",
      "Cool white/6000K color temperature",
      "White LED color instead of orange",
      "Gentle/appropriate brightness level",
      "LED produces white light"
    ]
  }
];
export const topUseCasesLight: UseCaseFeedback[] = [
  {
    "useCase": "Appearance Aesthetics",
    "totalMentions": 373,
    "positiveCount": 303,
    "negativeCount": 70,
    "satisfactionRate": 81.2,
    "categoryType": "Physical",
    "topSatisfactionReasons": [
      "white color",
      "gray color matches well with other brands and fixtures",
      "nice looking",
      "available in black color",
      "Looks great"
    ],
    "topGapReasons": [
      "Off-white color instead of white",
      "color does not match other BESTTEN switches",
      "off-white or bone color rather than pure white",
      "Not true white but light gray/off-white color",
      "Sandwich style design"
    ],
    "relatedCategories": [
      "Wall Plate Design and Aesthetics",
      "Wire Configuration",
      "Button Interface",
      "Color and Finish",
      "Wire Connection Mechanisms"
    ]
  },
  {
    "useCase": "Functionality Operation",
    "totalMentions": 275,
    "positiveCount": 149,
    "negativeCount": 126,
    "satisfactionRate": 54.2,
    "categoryType": "Physical",
    "topSatisfactionReasons": [
      "LED light component that illuminates the switch",
      "Requires neutral wire connection for nightlight to work",
      "physical button controls",
      "compact single gang size for three switches",
      "metal tab connecting the two switches"
    ],
    "topGapReasons": [
      "LED lights fail or stop working",
      "Switch breaks or fails mechanically",
      "LED light component that illuminates the switch",
      "shorter toggle than standard switches",
      "lack_of_resistance_in_switching_mechanism"
    ],
    "relatedCategories": [
      "Build Quality and Construction",
      "Surface Quality",
      "Face Plates",
      "Internal Electronics and Components",
      "Physical Dimensions and Fit"
    ]
  },
  {
    "useCase": "Quality Durability",
    "totalMentions": 211,
    "positiveCount": 169,
    "negativeCount": 42,
    "satisfactionRate": 80.1,
    "categoryType": "Physical",
    "topSatisfactionReasons": [
      "Good quality construction",
      "good quality",
      "Heavy duty construction",
      "Solid construction",
      "well made construction"
    ],
    "topGapReasons": [
      "poor_construction_quality",
      "overpriced plastic construction",
      "all plastic construction",
      "cheap materials used",
      "low build quality"
    ],
    "relatedCategories": [
      "Build Quality and Construction",
      "Build Quality and Materials",
      "Material Composition",
      "Mounting and Installation Hardware",
      "Structural Durability"
    ]
  },
  {
    "useCase": "Lighting Control",
    "totalMentions": 117,
    "positiveCount": 68,
    "negativeCount": 49,
    "satisfactionRate": 58.1,
    "categoryType": "Physical",
    "topSatisfactionReasons": [
      "LED lights provide illumination when switch is off",
      "light brightness appropriate for nighttime",
      "Light brightness level",
      "Brightness level varies from very bright to extremely dim",
      "LED lights are bright enough for navigation"
    ],
    "topGapReasons": [
      "very dim brightness",
      "not bright",
      "LED lights are not very bright",
      "Not bright enough/dim illumination",
      "Brightness level varies from very bright to extremely dim"
    ],
    "relatedCategories": [
      "Indicator Lighting",
      "Night Light Features",
      "Indicator Lights",
      "LED Indicator and Lighting Features",
      "Button Interface"
    ]
  },
  {
    "useCase": "Smart Home",
    "totalMentions": 104,
    "positiveCount": 73,
    "negativeCount": 31,
    "satisfactionRate": 70.2,
    "categoryType": "Physical",
    "topSatisfactionReasons": [
      "Nice looking/beautiful appearance",
      "attractive visual appearance",
      "modern appearance",
      "Gold color appearance",
      "good appearance"
    ],
    "topGapReasons": [
      "Yellow appearance instead of gold",
      "tabs that must be snapped off for traditional plates",
      "Larger than standard non-smart switch",
      "produces clicking or slapping noise when operated",
      "WiFi indicator light"
    ],
    "relatedCategories": [
      "Wall Plate Design and Aesthetics",
      "Surface Quality",
      "Visual Appearance",
      "Surface Characteristics",
      "Mounting and Installation Hardware"
    ]
  },
  {
    "useCase": "Compatibility Fit",
    "totalMentions": 89,
    "positiveCount": 36,
    "negativeCount": 53,
    "satisfactionRate": 40.4,
    "categoryType": "Physical",
    "topSatisfactionReasons": [
      "perfect fit",
      "perfect size",
      "standard size",
      "Fits very well",
      "use standard screws and decora plates"
    ],
    "topGapReasons": [
      "tiny pinpoint size",
      "small size",
      "pencil point size",
      "deep/large size requiring spacious wall boxes",
      "mounting/housing needs to be wider to fully cover existing box"
    ],
    "relatedCategories": [
      "Internal Electronics and Components",
      "Physical Dimensions and Fit",
      "Wire Connection Mechanisms",
      "Physical Size and Fit",
      "Installation Compatibility"
    ]
  },
  {
    "useCase": "Installation Replacement",
    "totalMentions": 59,
    "positiveCount": 37,
    "negativeCount": 22,
    "satisfactionRate": 62.7,
    "categoryType": "Physical",
    "topSatisfactionReasons": [
      "Switch can be installed upside down",
      "great looks when installed",
      "larger than normal switch, takes more room in electrical box",
      "requires neutral wire for installation",
      "small size makes it easy to fit into electrical box"
    ],
    "topGapReasons": [
      "large back/housing that is difficult to fit in electrical boxes",
      "large physical dimensions causing fit issues in electrical boxes",
      "wiring diagrams done without proper knowledge",
      "too thin and flexes during installation",
      "tells you how to install but not how to control it"
    ],
    "relatedCategories": [
      "Wire Configuration",
      "Installation Compatibility",
      "Physical Dimensions",
      "Screw Quality and Fit",
      "Wiring Configuration and Connections"
    ]
  },
  {
    "useCase": "Energy Efficiency",
    "totalMentions": 54,
    "positiveCount": 24,
    "negativeCount": 30,
    "satisfactionRate": 44.4,
    "categoryType": "Physical",
    "topSatisfactionReasons": [
      "Has LED indicator light",
      "LED produces white light",
      "LED lights have automatic on/off sensor",
      "LED indicators present",
      "green led light comes on when fan kicks in"
    ],
    "topGapReasons": [
      "LED lights illuminate upward",
      "led lamps do not light up",
      "LED lights flicker",
      "blue LED indicator light",
      "LED lights are visible through the cover"
    ],
    "relatedCategories": [
      "Indicator Lighting",
      "Indicator Lights",
      "LED Indicator and Lighting Features",
      "LED Indicator Design",
      "Wiring Configuration and Connections"
    ]
  },
  {
    "useCase": "Value Price",
    "totalMentions": 26,
    "positiveCount": 1,
    "negativeCount": 25,
    "satisfactionRate": 3.8,
    "categoryType": "Physical",
    "topSatisfactionReasons": [
      "not cheaply made"
    ],
    "topGapReasons": [
      "cheaply made",
      "Cheaply made",
      "cheaply built",
      "cheap plastic feel",
      "Cheaply made product"
    ],
    "relatedCategories": [
      "Build Quality and Construction",
      "Build Quality and Materials",
      "Material Composition",
      "Switch Actuation Mechanism",
      "Mounting and Installation Hardware"
    ]
  }
];
export const allLightCategories: CategoryFeedback[] = [
  {
    "category": "Color Matching",
    "categoryType": "Physical",
    "mentions": 3,
    "satisfactionRate": 0.0,
    "negativeRate": 100.0,
    "positiveCount": 0,
    "negativeCount": 8,
    "totalReviews": 8,
    "averageRating": 1.62,
    "topNegativeAspects": [
      "Off-white color instead of white",
      "Gloss ivory color instead of gloss white",
      "off-white color that looks dirty rather than true white"
    ],
    "topPositiveAspects": []
  },
  {
    "category": "Surface Quality",
    "categoryType": "Physical",
    "mentions": 3,
    "satisfactionRate": 0.0,
    "negativeRate": 100.0,
    "positiveCount": 0,
    "negativeCount": 3,
    "totalReviews": 3,
    "averageRating": 3.0,
    "topNegativeAspects": [
      "one switch was smudged and dirty",
      "black smudge stain that cannot be cleaned",
      "burn marks appear on switch when turned on"
    ],
    "topPositiveAspects": []
  },
  {
    "category": "Physical Durability",
    "categoryType": "Physical",
    "mentions": 33,
    "satisfactionRate": 0.0,
    "negativeRate": 100.0,
    "positiveCount": 0,
    "negativeCount": 24,
    "totalReviews": 24,
    "averageRating": 1.58,
    "topNegativeAspects": [
      "Switch breaks or fails mechanically",
      "buttons break easily",
      "paddle that pops out",
      "rocker switch stuck to on position",
      "switches broken and flopped in seat"
    ],
    "topPositiveAspects": []
  },
  {
    "category": "Face Plates",
    "categoryType": "Physical",
    "mentions": 2,
    "satisfactionRate": 0.0,
    "negativeRate": 100.0,
    "positiveCount": 0,
    "negativeCount": 2,
    "totalReviews": 2,
    "averageRating": 4.0,
    "topNegativeAspects": [
      "snap on cover plate",
      "Snap in mechanisms are not the same for switches and receptacles"
    ],
    "topPositiveAspects": []
  },
  {
    "category": "Wire Connection Compatibility",
    "categoryType": "Physical",
    "mentions": 4,
    "satisfactionRate": 0.0,
    "negativeRate": 100.0,
    "positiveCount": 0,
    "negativeCount": 4,
    "totalReviews": 4,
    "averageRating": 2.5,
    "topNegativeAspects": [
      "accepts only small gauge wire",
      "accepts 14 gauge wire only",
      "too small for 12 gauge wire",
      "Back holes won't admit 12 gauge wire"
    ],
    "topPositiveAspects": []
  },
  {
    "category": "Component Reliability",
    "categoryType": "Physical",
    "mentions": 8,
    "satisfactionRate": 0.0,
    "negativeRate": 100.0,
    "positiveCount": 0,
    "negativeCount": 8,
    "totalReviews": 8,
    "averageRating": 1.75,
    "topNegativeAspects": [
      "terminal screws are poor quality and do not engage straight blade screw drivers securely",
      "one terminal screw stripped while securing wire",
      "one of the sockets was loose",
      "Grounding screws aren't locked in, backing fumbles around when undone",
      "Side screws can become disconnected from internal nut if backed out too far"
    ],
    "topPositiveAspects": []
  },
  {
    "category": "Product Condition Issues",
    "categoryType": "Physical",
    "mentions": 2,
    "satisfactionRate": 0.0,
    "negativeRate": 100.0,
    "positiveCount": 0,
    "negativeCount": 2,
    "totalReviews": 2,
    "averageRating": 1.0,
    "topNegativeAspects": [
      "burnt wire in used product",
      "crooked alignment"
    ],
    "topPositiveAspects": []
  },
  {
    "category": "Mounting Tabs and Hardware",
    "categoryType": "Physical",
    "mentions": 2,
    "satisfactionRate": 0.0,
    "negativeRate": 100.0,
    "positiveCount": 0,
    "negativeCount": 2,
    "totalReviews": 2,
    "averageRating": 3.0,
    "topNegativeAspects": [
      "Heavy gauge metal tabs",
      "Snap-off ears don't fit curved edge utility box covers properly"
    ],
    "topPositiveAspects": []
  },
  {
    "category": "Toggle Operation",
    "categoryType": "Physical",
    "mentions": 1,
    "satisfactionRate": 0.0,
    "negativeRate": 100.0,
    "positiveCount": 0,
    "negativeCount": 1,
    "totalReviews": 1,
    "averageRating": 2.0,
    "topNegativeAspects": [
      "toggle does not move full to up or down position"
    ],
    "topPositiveAspects": []
  },
  {
    "category": "Screw Quality and Fit",
    "categoryType": "Physical",
    "mentions": 8,
    "satisfactionRate": 0.0,
    "negativeRate": 100.0,
    "positiveCount": 0,
    "negativeCount": 8,
    "totalReviews": 8,
    "averageRating": 3.38,
    "topNegativeAspects": [
      "One of the screws had been forced into the wrong hole and took a great deal of trouble to remove",
      "A bit tough getting the screws to tighten",
      "screws strip easily",
      "Always 1/4 inch too short for North American homes",
      "One cover without screws"
    ],
    "topPositiveAspects": []
  },
  {
    "category": "Switch Housing",
    "categoryType": "Physical",
    "mentions": 4,
    "satisfactionRate": 0.0,
    "negativeRate": 100.0,
    "positiveCount": 0,
    "negativeCount": 4,
    "totalReviews": 4,
    "averageRating": 2.0,
    "topNegativeAspects": [
      "screws go inside housing under pressure",
      "switch casing slightly skewed, making it hard to fit into standard plate",
      "plastic housing with retaining bracket",
      "plastic cover that can separate easily"
    ],
    "topPositiveAspects": []
  },
  {
    "category": "Color Accuracy",
    "categoryType": "Physical",
    "mentions": 14,
    "satisfactionRate": 0.0,
    "negativeRate": 100.0,
    "positiveCount": 0,
    "negativeCount": 18,
    "totalReviews": 18,
    "averageRating": 2.44,
    "topNegativeAspects": [
      "Not true white but light gray/off-white color",
      "not snow white but off-white",
      "not white like they should be",
      "bone color instead of white",
      "light cream color"
    ],
    "topPositiveAspects": []
  },
  {
    "category": "Wall Plate Fit and Alignment",
    "categoryType": "Physical",
    "mentions": 2,
    "satisfactionRate": 0.0,
    "negativeRate": 100.0,
    "positiveCount": 0,
    "negativeCount": 2,
    "totalReviews": 2,
    "averageRating": 3.5,
    "topNegativeAspects": [
      "Stick out a bit from wall",
      "Pretty thin and don't align correctly, leave a slight gap"
    ],
    "topPositiveAspects": []
  },
  {
    "category": "Surface Condition and Finish",
    "categoryType": "Physical",
    "mentions": 2,
    "satisfactionRate": 0.0,
    "negativeRate": 100.0,
    "positiveCount": 0,
    "negativeCount": 5,
    "totalReviews": 5,
    "averageRating": 2.2,
    "topNegativeAspects": [
      "scuffs and scratches",
      "scratches and dings on visible parts"
    ],
    "topPositiveAspects": []
  },
  {
    "category": "Sound During Operation",
    "categoryType": "Physical",
    "mentions": 1,
    "satisfactionRate": 0.0,
    "negativeRate": 100.0,
    "positiveCount": 0,
    "negativeCount": 1,
    "totalReviews": 1,
    "averageRating": 4.0,
    "topNegativeAspects": [
      "makes loud sound when switching"
    ],
    "topPositiveAspects": []
  },
  {
    "category": "Structural Mounting Features",
    "categoryType": "Physical",
    "mentions": 6,
    "satisfactionRate": 0.0,
    "negativeRate": 100.0,
    "positiveCount": 0,
    "negativeCount": 6,
    "totalReviews": 6,
    "averageRating": 1.83,
    "topNegativeAspects": [
      "extended tabs above and below the box",
      "plastic at the top and bottom like tabs",
      "thick plastic tabs for box attachment",
      "thick plastic mounting ears",
      "riveted retaining bracket in rear center"
    ],
    "topPositiveAspects": []
  },
  {
    "category": "Housing Fit",
    "categoryType": "Physical",
    "mentions": 2,
    "satisfactionRate": 0.0,
    "negativeRate": 100.0,
    "positiveCount": 0,
    "negativeCount": 2,
    "totalReviews": 2,
    "averageRating": 3.5,
    "topNegativeAspects": [
      "clearance between housing and bolt heads is too narrow",
      "front case won't close unless held together"
    ],
    "topPositiveAspects": []
  },
  {
    "category": "Slider Mechanisms",
    "categoryType": "Physical",
    "mentions": 1,
    "satisfactionRate": 0.0,
    "negativeRate": 100.0,
    "positiveCount": 0,
    "negativeCount": 1,
    "totalReviews": 1,
    "averageRating": 3.0,
    "topNegativeAspects": [
      "Only works in 1/4 of the stroke"
    ],
    "topPositiveAspects": []
  },
  {
    "category": "Surface Characteristics",
    "categoryType": "Physical",
    "mentions": 5,
    "satisfactionRate": 0.0,
    "negativeRate": 100.0,
    "positiveCount": 0,
    "negativeCount": 5,
    "totalReviews": 5,
    "averageRating": 1.8,
    "topNegativeAspects": [
      "\"Leviton\" embossing on the switch appears to serve no purpose other than to attract dust and create a sense of dirtiness",
      "Has scuff marks when used",
      "smudges and black stuff on surface",
      "Embossed name on switch harbors bacteria and viruses",
      "No longer perfectly smooth for cleaning"
    ],
    "topPositiveAspects": []
  },
  {
    "category": "Mounting and Installation Hardware",
    "categoryType": "Physical",
    "mentions": 15,
    "satisfactionRate": 6.7,
    "negativeRate": 93.3,
    "positiveCount": 1,
    "negativeCount": 14,
    "totalReviews": 15,
    "averageRating": 3.13,
    "topNegativeAspects": [
      "cheap mounting screws that strip easily",
      "lighter weight screws with low quality metal",
      "screw holes cause misalignment in multi gang boxes",
      "drive is not standard Phillips head but appears to be square",
      "bolts are too short by just a mm"
    ],
    "topPositiveAspects": [
      "cover screws are in the correct area"
    ]
  },
  {
    "category": "Cover Plates",
    "categoryType": "Physical",
    "mentions": 10,
    "satisfactionRate": 15.8,
    "negativeRate": 84.2,
    "positiveCount": 3,
    "negativeCount": 16,
    "totalReviews": 19,
    "averageRating": 3.0,
    "topNegativeAspects": [
      "cover plates not included",
      "Tab on switch cover breaks off",
      "cheap cover",
      "faceplate color doesn't match the switch",
      "too thin and flexes during installation"
    ],
    "topPositiveAspects": [
      "wall plate is included",
      "comes with its own wall plate",
      "provides clean finished look"
    ]
  },
  {
    "category": "Indicator Lights",
    "categoryType": "Physical",
    "mentions": 7,
    "satisfactionRate": 16.7,
    "negativeRate": 83.3,
    "positiveCount": 3,
    "negativeCount": 15,
    "totalReviews": 18,
    "averageRating": 3.17,
    "topNegativeAspects": [
      "not bright",
      "led lamps do not light up",
      "light points up against wall",
      "flickering lights"
    ],
    "topPositiveAspects": [
      "very sufficient illumination",
      "bright but not eye-hurting",
      "light illuminates area above switch"
    ]
  },
  {
    "category": "Material Composition",
    "categoryType": "Physical",
    "mentions": 15,
    "satisfactionRate": 16.7,
    "negativeRate": 83.3,
    "positiveCount": 3,
    "negativeCount": 15,
    "totalReviews": 18,
    "averageRating": 2.83,
    "topNegativeAspects": [
      "plastic parts",
      "feels cheap",
      "brittle plastic that breaks over time",
      "back black plastic broken",
      "cheaply made and feel it"
    ],
    "topPositiveAspects": [
      "Made of quality material",
      "feel like high quality materials",
      "Plastic material"
    ]
  },
  {
    "category": "Switch Operation Mechanism",
    "categoryType": "Physical",
    "mentions": 6,
    "satisfactionRate": 16.7,
    "negativeRate": 83.3,
    "positiveCount": 1,
    "negativeCount": 5,
    "totalReviews": 6,
    "averageRating": 3.33,
    "topNegativeAspects": [
      "rocker rocks in the frame before engaging",
      "rocker function is broken",
      "rocker too firm to push",
      "play in rocker before activation with inconsistent feel",
      "very small up-and-down switch operating range"
    ],
    "topPositiveAspects": [
      "completely silent"
    ]
  },
  {
    "category": "Button Operation",
    "categoryType": "Physical",
    "mentions": 5,
    "satisfactionRate": 20.0,
    "negativeRate": 80.0,
    "positiveCount": 1,
    "negativeCount": 4,
    "totalReviews": 5,
    "averageRating": 1.8,
    "topNegativeAspects": [
      "mushy buttons that click down but soft when pressed up",
      "difficult to activate buttons requiring multiple touches",
      "button snaps on but soft-closes off without sharp snap",
      "much harder to depress, sometimes needs a thump"
    ],
    "topPositiveAspects": [
      "good sensitivity of push button"
    ]
  },
  {
    "category": "Operational Sound",
    "categoryType": "Performance",
    "mentions": 14,
    "satisfactionRate": 20.0,
    "negativeRate": 80.0,
    "positiveCount": 2,
    "negativeCount": 8,
    "totalReviews": 10,
    "averageRating": 4.2,
    "topNegativeAspects": [
      "click noise when turned on or off",
      "loud click sound",
      "some sound louder than others when turning on/off",
      "slightly too loud and tinny sounding",
      "noisier than Leviton switches"
    ],
    "topPositiveAspects": [
      "quiet switch tap",
      "Medium click sound level"
    ]
  },
  {
    "category": "Operational Feedback",
    "categoryType": "Physical",
    "mentions": 4,
    "satisfactionRate": 20.0,
    "negativeRate": 80.0,
    "positiveCount": 1,
    "negativeCount": 4,
    "totalReviews": 5,
    "averageRating": 3.8,
    "topNegativeAspects": [
      "produces clicking or slapping noise when operated",
      "Switching mechanism not smooth or easy",
      "Sharp plastic click sound"
    ],
    "topPositiveAspects": [
      "not too loud when used"
    ]
  },
  {
    "category": "Mounting and Installation",
    "categoryType": "Physical",
    "mentions": 11,
    "satisfactionRate": 22.2,
    "negativeRate": 77.8,
    "positiveCount": 4,
    "negativeCount": 14,
    "totalReviews": 18,
    "averageRating": 3.83,
    "topNegativeAspects": [
      "tabs that must be snapped off for traditional plates",
      "extra plastic on mounting plate causing issues with screwless cover plates",
      "thick tabs preventing switch plate covers from laying flat",
      "flimsy tabs that are too weak to force outlets flat",
      "plastic on tabs interfering with screw tightening"
    ],
    "topPositiveAspects": [
      "Switch can be installed upside down"
    ]
  },
  {
    "category": "Internal Electronics and Components",
    "categoryType": "Physical",
    "mentions": 13,
    "satisfactionRate": 23.1,
    "negativeRate": 76.9,
    "positiveCount": 3,
    "negativeCount": 10,
    "totalReviews": 13,
    "averageRating": 2.85,
    "topNegativeAspects": [
      "Internal relay",
      "overheating issues",
      "internal switch component",
      "battery contact issues",
      "internal connector was bad"
    ],
    "topPositiveAspects": [
      "relay component",
      "Plug cover on the inside",
      "TYWE3S chip in 2021 models"
    ]
  },
  {
    "category": "Button and Switch Operation",
    "categoryType": "Physical",
    "mentions": 11,
    "satisfactionRate": 23.1,
    "negativeRate": 76.9,
    "positiveCount": 3,
    "negativeCount": 10,
    "totalReviews": 13,
    "averageRating": 3.38,
    "topNegativeAspects": [
      "paddle switch",
      "very stiff toggle",
      "Very short button travel, doesn't feel like quality switch",
      "Large toggle is flimsy feeling",
      "Button gets stuck at certain angles"
    ],
    "topPositiveAspects": [
      "superior sound and feel when physically pressed",
      "Nice feel when operated",
      "responsive touch buttons with satisfying tactile experience"
    ]
  },
  {
    "category": "Switch Shape Design",
    "categoryType": "Physical",
    "mentions": 4,
    "satisfactionRate": 25.0,
    "negativeRate": 75.0,
    "positiveCount": 1,
    "negativeCount": 3,
    "totalReviews": 4,
    "averageRating": 2.5,
    "topNegativeAspects": [
      "raised rectangular area around switch",
      "square and sharp switch edges",
      "low profile corners"
    ],
    "topPositiveAspects": [
      "Perfect slim design"
    ]
  },
  {
    "category": "Packaging and Documentation",
    "categoryType": "Physical",
    "mentions": 30,
    "satisfactionRate": 27.8,
    "negativeRate": 72.2,
    "positiveCount": 10,
    "negativeCount": 26,
    "totalReviews": 36,
    "averageRating": 3.33,
    "topNegativeAspects": [
      "small print, hard to read instructions",
      "covers come together as one unit instead of separate individual covers",
      "no instructions included",
      "sub-standard quality",
      "do not make neutral wire requirement clear"
    ],
    "topPositiveAspects": [
      "easy to understand instructions",
      "clear wiring directions and labeling",
      "wire lever nuts included",
      "high quality packaging",
      "impressed with packaging"
    ]
  },
  {
    "category": "Indicator Lighting",
    "categoryType": "Performance",
    "mentions": 18,
    "satisfactionRate": 28.6,
    "negativeRate": 71.4,
    "positiveCount": 2,
    "negativeCount": 5,
    "totalReviews": 7,
    "averageRating": 2.57,
    "topNegativeAspects": [
      "blue LED indicator light",
      "indicator light is very dim and hard to see when room lights are on",
      "indicator lights have inconsistent brightness between switches",
      "led not illuminated when dead"
    ],
    "topPositiveAspects": [
      "green led light comes on when fan kicks in",
      "blue LED indicator light"
    ]
  },
  {
    "category": "Audio Feedback",
    "categoryType": "Physical",
    "mentions": 21,
    "satisfactionRate": 32.0,
    "negativeRate": 68.0,
    "positiveCount": 8,
    "negativeCount": 17,
    "totalReviews": 25,
    "averageRating": 4.0,
    "topNegativeAspects": [
      "loud click sound",
      "loud noise when flipped",
      "Switch sounds cheap or empty when flipping",
      "Loud clicking sound",
      "makes loud click sound"
    ],
    "topPositiveAspects": [
      "Definitive click sound",
      "very secure click",
      "audible click when switching on/off",
      "Clear and loud switching sound"
    ]
  },
  {
    "category": "Button Interface",
    "categoryType": "Physical",
    "mentions": 6,
    "satisfactionRate": 33.3,
    "negativeRate": 66.7,
    "positiveCount": 2,
    "negativeCount": 4,
    "totalReviews": 6,
    "averageRating": 3.33,
    "topNegativeAspects": [
      "finicky button press location",
      "off button is finicky",
      "buttons lack illumination",
      "pushing button is more annoying than flipping traditional switch"
    ],
    "topPositiveAspects": [
      "tactile feedback and audible click",
      "push button switch design"
    ]
  },
  {
    "category": "Toggle Mechanisms",
    "categoryType": "Physical",
    "mentions": 4,
    "satisfactionRate": 33.3,
    "negativeRate": 66.7,
    "positiveCount": 2,
    "negativeCount": 4,
    "totalReviews": 6,
    "averageRating": 3.33,
    "topNegativeAspects": [
      "lacks on/off labeling",
      "does not toggle smoothly",
      "has clear ring around toggle"
    ],
    "topPositiveAspects": [
      "has solid white toggle",
      "has clear ring around toggle"
    ]
  },
  {
    "category": "Wiring Connections",
    "categoryType": "Physical",
    "mentions": 23,
    "satisfactionRate": 36.0,
    "negativeRate": 64.0,
    "positiveCount": 9,
    "negativeCount": 16,
    "totalReviews": 25,
    "averageRating": 3.76,
    "topNegativeAspects": [
      "wire leads instead of screw terminals",
      "identical to three-way version with paper plug",
      "retains common terminal label",
      "bad contact problem",
      "Wire clamps could be designed better as solid core wires can be tricky to be well held"
    ],
    "topPositiveAspects": [
      "quickwire push-in connection",
      "has side screws and quick hookup options",
      "ground connection is on the top",
      "2 separate Common terminals and a commoning bar",
      "long wire leads"
    ]
  },
  {
    "category": "Wiring Terminals",
    "categoryType": "Physical",
    "mentions": 8,
    "satisfactionRate": 36.4,
    "negativeRate": 63.6,
    "positiveCount": 4,
    "negativeCount": 7,
    "totalReviews": 11,
    "averageRating": 3.45,
    "topNegativeAspects": [
      "no push-in back wire option, screw terminals only",
      "lower right corner connection issues",
      "difficult to use with 12 gauge wire",
      "terminal_screw_tightening_affects_switch_operation"
    ],
    "topPositiveAspects": [
      "ground screw at bottom",
      "has all the terminals",
      "has a ground screw",
      "easy with 14 gauge wire"
    ]
  },
  {
    "category": "Cover Plates and Faceplates",
    "categoryType": "Physical",
    "mentions": 8,
    "satisfactionRate": 37.5,
    "negativeRate": 62.5,
    "positiveCount": 3,
    "negativeCount": 5,
    "totalReviews": 8,
    "averageRating": 3.12,
    "topNegativeAspects": [
      "Extremely difficult to snap in place",
      "Thick and extends beyond the switch",
      "cover plate wouldn't snap on due to recessed switches",
      "face plate keeps falling off",
      "cover plates do not fit properly"
    ],
    "topPositiveAspects": [
      "work with other/different wall plates",
      "high quality plate",
      "specialty cover plate ensures perfect alignment"
    ]
  },
  {
    "category": "Switch Operation Feel",
    "categoryType": "Physical",
    "mentions": 8,
    "satisfactionRate": 37.5,
    "negativeRate": 62.5,
    "positiveCount": 3,
    "negativeCount": 5,
    "totalReviews": 8,
    "averageRating": 3.38,
    "topNegativeAspects": [
      "spongy feel in down position",
      "rocker has resistance when pushing",
      "Rocker switch in opposite direction than norm",
      "Switches opposite of typical design",
      "On position like normal switch but light illuminates ceiling"
    ],
    "topPositiveAspects": [
      "good feel in up position with locking",
      "satisfying toggle feel",
      "nice feel flipping on and off"
    ]
  },
  {
    "category": "Wire Connection Mechanisms",
    "categoryType": "Physical",
    "mentions": 39,
    "satisfactionRate": 40.5,
    "negativeRate": 59.5,
    "positiveCount": 17,
    "negativeCount": 25,
    "totalReviews": 42,
    "averageRating": 3.17,
    "topNegativeAspects": [
      "Screws do not go back in once removed",
      "flimsy terminals that never tighten up properly",
      "tight plug insertion requiring force",
      "Only accommodates one wire per connection",
      "Push-in wire slots not holding, slipping back out"
    ],
    "topPositiveAspects": [
      "screw terminals available",
      "Made for back wiring",
      "14 AWG wires slide into back easily",
      "12 AWG wires need to be screwed to side mount screws",
      "push-in holes rated for 14 gauge wire"
    ]
  },
  {
    "category": "Terminal Connections",
    "categoryType": "Physical",
    "mentions": 17,
    "satisfactionRate": 41.2,
    "negativeRate": 58.8,
    "positiveCount": 7,
    "negativeCount": 10,
    "totalReviews": 17,
    "averageRating": 2.88,
    "topNegativeAspects": [
      "missing ground connection on some switches",
      "earth connection at different places on different switches",
      "top brass term screw missing",
      "top black terminal screw missing",
      "two terminal bolts installed at an angle, threads stripped when backed out"
    ],
    "topPositiveAspects": [
      "screws that are strong and hold wires well",
      "easy grounding screw attachment that clamps down",
      "clearly marked terminals on the back",
      "side screws are easy to turn and tighten",
      "terminal posts with additional guard"
    ]
  },
  {
    "category": "Switch Mechanism",
    "categoryType": "Physical",
    "mentions": 11,
    "satisfactionRate": 41.7,
    "negativeRate": 58.3,
    "positiveCount": 5,
    "negativeCount": 7,
    "totalReviews": 12,
    "averageRating": 3.17,
    "topNegativeAspects": [
      "lack_of_resistance_in_switching_mechanism",
      "squeaks when pushed",
      "spring inside is loud",
      "rocker clicks quite loudly when pressing on/off",
      "three way switch works as single pole"
    ],
    "topPositiveAspects": [
      "Has satisfying click",
      "good \"click\" as they switch",
      "nice feel to the switch",
      "nice soft operation that is smooth and quiet",
      "nice feeling switch"
    ]
  },
  {
    "category": "Visual Indicator Lights",
    "categoryType": "Physical",
    "mentions": 10,
    "satisfactionRate": 41.7,
    "negativeRate": 58.3,
    "positiveCount": 5,
    "negativeCount": 7,
    "totalReviews": 12,
    "averageRating": 3.67,
    "topNegativeAspects": [
      "WiFi indicator light",
      "green light when off and red light when on",
      "no status LED",
      "doesn't illuminate when off",
      "not backlit on switch"
    ],
    "topPositiveAspects": [
      "lighted switch when on",
      "LED indicators can be toggled and aren't too bright",
      "flashing green light during setup",
      "locator/indicator LED",
      "Small light bar on side"
    ]
  },
  {
    "category": "Packaging Quality",
    "categoryType": "Physical",
    "mentions": 31,
    "satisfactionRate": 42.4,
    "negativeRate": 57.6,
    "positiveCount": 14,
    "negativeCount": 19,
    "totalReviews": 33,
    "averageRating": 3.39,
    "topNegativeAspects": [
      "arrived with crud/fingerprints that couldn't be cleaned",
      "Switches arrived broken",
      "Missing small screws for cover plate",
      "box crushed",
      "appears to have been previously used"
    ],
    "topPositiveAspects": [
      "Switch was packaged well and protected",
      "come individually wrapped",
      "well packaged",
      "packaged well",
      "individually packaged"
    ]
  },
  {
    "category": "Physical Size and Fit",
    "categoryType": "Physical",
    "mentions": 6,
    "satisfactionRate": 42.9,
    "negativeRate": 57.1,
    "positiveCount": 3,
    "negativeCount": 4,
    "totalReviews": 7,
    "averageRating": 3.14,
    "topNegativeAspects": [
      "shorter toggle than standard switches",
      "shorter and wider than other brands",
      "will not fit standard cover plates"
    ],
    "topPositiveAspects": [
      "bigger box size",
      "switch not as long as old switches",
      "little wider than typical standard switch"
    ]
  },
  {
    "category": "Safety Certifications",
    "categoryType": "Physical",
    "mentions": 6,
    "satisfactionRate": 42.9,
    "negativeRate": 57.1,
    "positiveCount": 3,
    "negativeCount": 4,
    "totalReviews": 7,
    "averageRating": 2.71,
    "topNegativeAspects": [
      "No safety approvals or certifications",
      "not UL approved, only CE approved for European use",
      "Not UL Listed"
    ],
    "topPositiveAspects": [
      "UL listing",
      "UL listed"
    ]
  },
  {
    "category": "Switch Actuation Mechanism",
    "categoryType": "Physical",
    "mentions": 32,
    "satisfactionRate": 43.8,
    "negativeRate": 56.2,
    "positiveCount": 14,
    "negativeCount": 18,
    "totalReviews": 32,
    "averageRating": 3.72,
    "topNegativeAspects": [
      "operates left and right instead of up and down",
      "scrapes against housing",
      "switch stays in the middle position",
      "flick down turns off lights and returns to middle",
      "not the same as the button it tries to imitate"
    ],
    "topPositiveAspects": [
      "solid switch that isn't loose",
      "Not roller type switch",
      "design forces finger use to flip switch rather than wall slapping",
      "good quality switching mechanisms",
      "has normal size switches rather than thick switches"
    ]
  },
  {
    "category": "LED Indicator Design",
    "categoryType": "Physical",
    "mentions": 12,
    "satisfactionRate": 44.8,
    "negativeRate": 55.2,
    "positiveCount": 13,
    "negativeCount": 16,
    "totalReviews": 29,
    "averageRating": 3.66,
    "topNegativeAspects": [
      "tiny pinpoint size",
      "pencil point size",
      "status light on when switch is on, off when switch is off",
      "Light shines from top not bottom"
    ],
    "topPositiveAspects": [
      "white color",
      "positioned above switch",
      "green color",
      "positioned at switch edge",
      "pinhole sized"
    ]
  },
  {
    "category": "Material Quality",
    "categoryType": "Physical",
    "mentions": 9,
    "satisfactionRate": 50.0,
    "negativeRate": 50.0,
    "positiveCount": 5,
    "negativeCount": 5,
    "totalReviews": 10,
    "averageRating": 3.1,
    "topNegativeAspects": [
      "overpriced plastic construction",
      "Made of cheap plastic",
      "Made of polycarbonate that cracks",
      "cheap plastic construction"
    ],
    "topPositiveAspects": [
      "high quality material",
      "feels sturdy",
      "good material quality",
      "Top quality materials"
    ]
  },
  {
    "category": "Installation Compatibility",
    "categoryType": "Physical",
    "mentions": 8,
    "satisfactionRate": 50.0,
    "negativeRate": 50.0,
    "positiveCount": 4,
    "negativeCount": 4,
    "totalReviews": 8,
    "averageRating": 4.62,
    "topNegativeAspects": [
      "makes junction box tight",
      "too recessed in older 2-gang electrical boxes",
      "Switch housing prevents installation in steel boxes",
      "difficult to fit in smaller electrical boxes"
    ],
    "topPositiveAspects": [
      "interlocking design for ideal spacing",
      "alignment feature for side-by-side installation",
      "easily line up with each other when installing",
      "fit together perfectly when using 2 or more side-by-side"
    ]
  },
  {
    "category": "Build Quality and Construction",
    "categoryType": "Physical",
    "mentions": 10,
    "satisfactionRate": 50.0,
    "negativeRate": 50.0,
    "positiveCount": 7,
    "negativeCount": 7,
    "totalReviews": 14,
    "averageRating": 3.21,
    "topNegativeAspects": [
      "poor_construction_quality",
      "cheaply made",
      "break easily when bumped"
    ],
    "topPositiveAspects": [
      "clean and sharp plastic molding",
      "clear metal work",
      "feels good in hand",
      "heavy_duty_construction",
      "heavy enough to suggest durability"
    ]
  },
  {
    "category": "Audible Feedback",
    "categoryType": "Physical",
    "mentions": 4,
    "satisfactionRate": 50.0,
    "negativeRate": 50.0,
    "positiveCount": 2,
    "negativeCount": 2,
    "totalReviews": 4,
    "averageRating": 5.0,
    "topNegativeAspects": [
      "not quiet switches",
      "audible click on relay"
    ],
    "topPositiveAspects": [
      "satisfying click when flipped",
      "nice hefty click"
    ]
  },
  {
    "category": "Component Accessories",
    "categoryType": "Physical",
    "mentions": 5,
    "satisfactionRate": 50.0,
    "negativeRate": 50.0,
    "positiveCount": 6,
    "negativeCount": 6,
    "totalReviews": 12,
    "averageRating": 3.5,
    "topNegativeAspects": [
      "included bulb adapter",
      "missing ceiling piece attached to actual light"
    ],
    "topPositiveAspects": [
      "included bulb adapter",
      "Comes with all screws and wire nuts necessary",
      "three separate pieces",
      "comes with ivory paddles"
    ]
  },
  {
    "category": "Wall Plate Design and Aesthetics",
    "categoryType": "Physical",
    "mentions": 3,
    "satisfactionRate": 50.0,
    "negativeRate": 50.0,
    "positiveCount": 2,
    "negativeCount": 2,
    "totalReviews": 4,
    "averageRating": 4.0,
    "topNegativeAspects": [
      "Sandwich style design"
    ],
    "topPositiveAspects": [
      "Clean and modern appearance",
      "Clean look with screws under faceplate"
    ]
  },
  {
    "category": "Color Matching and Consistency",
    "categoryType": "Physical",
    "mentions": 2,
    "satisfactionRate": 50.0,
    "negativeRate": 50.0,
    "positiveCount": 1,
    "negativeCount": 1,
    "totalReviews": 2,
    "averageRating": 3.0,
    "topNegativeAspects": [
      "White does not match other Bestten white products"
    ],
    "topPositiveAspects": [
      "Color matches other switches"
    ]
  },
  {
    "category": "Physical Dimensions and Fit",
    "categoryType": "Physical",
    "mentions": 8,
    "satisfactionRate": 50.0,
    "negativeRate": 50.0,
    "positiveCount": 4,
    "negativeCount": 4,
    "totalReviews": 8,
    "averageRating": 4.12,
    "topNegativeAspects": [
      "thinner than standard white switches",
      "thicker than normal switches",
      "plate smaller than standard size",
      "irregular plate sizes"
    ],
    "topPositiveAspects": [
      "standard size",
      "Larger surface area",
      "fits on a single gang box",
      "compact size"
    ]
  },
  {
    "category": "LED Indicator and Lighting Features",
    "categoryType": "Physical",
    "mentions": 96,
    "satisfactionRate": 52.9,
    "negativeRate": 47.1,
    "positiveCount": 118,
    "negativeCount": 105,
    "totalReviews": 223,
    "averageRating": 3.7,
    "topNegativeAspects": [
      "very dim brightness",
      "very dim and barely visible",
      "dim/low light emission",
      "LED lights fail or stop working",
      "LED lights illuminate upward"
    ],
    "topPositiveAspects": [
      "LED light component that illuminates the switch",
      "LED lights provide illumination when switch is off",
      "Light brightness level",
      "Has LED indicator light",
      "White/clear light color"
    ]
  },
  {
    "category": "Installation Fit",
    "categoryType": "Physical",
    "mentions": 14,
    "satisfactionRate": 53.3,
    "negativeRate": 46.7,
    "positiveCount": 8,
    "negativeCount": 7,
    "totalReviews": 15,
    "averageRating": 3.73,
    "topNegativeAspects": [
      "plastic paddle switches do not fit well with visible gap in OFF position",
      "switch doesn't sit flush on bottom with wiggle room",
      "gaps at the top",
      "plastic on the switch sticks out and is not flush",
      "doesn't sit flush against wall"
    ],
    "topPositiveAspects": [
      "Fits very well",
      "slim profile and proper fit",
      "perfect alignment and flush finish with specialty cover plate",
      "fits perfectly",
      "good fit"
    ]
  },
  {
    "category": "Material Quality and Durability",
    "categoryType": "Physical",
    "mentions": 22,
    "satisfactionRate": 53.8,
    "negativeRate": 46.2,
    "positiveCount": 14,
    "negativeCount": 12,
    "totalReviews": 26,
    "averageRating": 3.27,
    "topNegativeAspects": [
      "Fragile plastic housing that can snap or disintegrate",
      "cheap materials used",
      "Very light plastic, does not feel solid",
      "Cracks after couple years",
      "lower-grade plastic"
    ],
    "topPositiveAspects": [
      "Quality materials",
      "Great quality plastic",
      "high-quality materials",
      "Made of durable material",
      "made of durable and sturdy solid steel"
    ]
  },
  {
    "category": "LED Illumination Performance",
    "categoryType": "Physical",
    "mentions": 16,
    "satisfactionRate": 54.8,
    "negativeRate": 45.2,
    "positiveCount": 23,
    "negativeCount": 19,
    "totalReviews": 42,
    "averageRating": 3.74,
    "topNegativeAspects": [
      "Not bright enough/dim illumination",
      "Brightness level varies from very bright to extremely dim",
      "Illumination fails after short period of use",
      "Non-uniform light distribution with shadows",
      "Always illuminated without adjustment"
    ],
    "topPositiveAspects": [
      "Brightness level varies from very bright to extremely dim",
      "Cool white/6000K color temperature",
      "White LED color instead of orange",
      "Gentle/appropriate brightness level",
      "LED produces white light"
    ]
  },
  {
    "category": "Rocker Switch Mechanisms",
    "categoryType": "Physical",
    "mentions": 7,
    "satisfactionRate": 55.6,
    "negativeRate": 44.4,
    "positiveCount": 5,
    "negativeCount": 4,
    "totalReviews": 9,
    "averageRating": 3.44,
    "topNegativeAspects": [
      "plastic is thin and brittle",
      "plastic hinge breaks off easily",
      "squishy with lot of give before click",
      "rocker switch breaks"
    ],
    "topPositiveAspects": [
      "wider switch paddle",
      "Thick/fat switch levers",
      "Spring function for the two rocker switches are very good"
    ]
  },
  {
    "category": "Tactile and Audio Feedback",
    "categoryType": "Physical",
    "mentions": 9,
    "satisfactionRate": 55.6,
    "negativeRate": 44.4,
    "positiveCount": 5,
    "negativeCount": 4,
    "totalReviews": 9,
    "averageRating": 4.56,
    "topNegativeAspects": [
      "hollow click sound during operation",
      "high resistance when toggling",
      "Switch operation noise level",
      "click sound"
    ],
    "topPositiveAspects": [
      "has audible click",
      "satisfying click",
      "very good springy pop in up or down position",
      "definite tactile feedback when operating",
      "smooth switch operation"
    ]
  },
  {
    "category": "Physical Dimensions",
    "categoryType": "Physical",
    "mentions": 10,
    "satisfactionRate": 60.0,
    "negativeRate": 40.0,
    "positiveCount": 6,
    "negativeCount": 4,
    "totalReviews": 10,
    "averageRating": 4.5,
    "topNegativeAspects": [
      "sticks out 3/4 inch from wall",
      "mounting/housing needs to be wider to fully cover existing box",
      "chunky size requiring big switch box",
      "will not fit in super shallow wall box"
    ],
    "topPositiveAspects": [
      "Lightweight",
      "Compact size that doesn't take much space in electrical box",
      "perfect fit",
      "perfect size",
      "fits in average sized electrical box"
    ]
  },
  {
    "category": "Switch Mechanism Feel",
    "categoryType": "Physical",
    "mentions": 5,
    "satisfactionRate": 60.0,
    "negativeRate": 40.0,
    "positiveCount": 3,
    "negativeCount": 2,
    "totalReviews": 5,
    "averageRating": 4.2,
    "topNegativeAspects": [
      "rough and clunky feel",
      "Stiffer operation compared to 3-way switches"
    ],
    "topPositiveAspects": [
      "smooth tactile feel",
      "clean feel",
      "Sturdy feel when switching"
    ]
  },
  {
    "category": "Wiring Configuration and Connections",
    "categoryType": "Physical",
    "mentions": 100,
    "satisfactionRate": 61.2,
    "negativeRate": 38.8,
    "positiveCount": 74,
    "negativeCount": 47,
    "totalReviews": 121,
    "averageRating": 4.01,
    "topNegativeAspects": [
      "requires neutral wire",
      "short wire length",
      "requires neutral wire for operation",
      "thin wire gauge",
      "16 gauge wires on transmitter"
    ],
    "topPositiveAspects": [
      "Requires neutral wire connection for nightlight to work",
      "requires neutral wire for light",
      "requires neutral wire",
      "Has connection hole under screw head for wire insertion",
      "requires neutral wire connection"
    ]
  },
  {
    "category": "Size and Fit",
    "categoryType": "Physical",
    "mentions": 61,
    "satisfactionRate": 61.5,
    "negativeRate": 38.5,
    "positiveCount": 48,
    "negativeCount": 30,
    "totalReviews": 78,
    "averageRating": 4.29,
    "topNegativeAspects": [
      "Larger than standard non-smart switch",
      "large back/housing that is difficult to fit in electrical boxes",
      "receiver is somewhat large",
      "large physical dimensions causing fit issues in electrical boxes",
      "deep/large size requiring spacious wall boxes"
    ],
    "topPositiveAspects": [
      "space-saving design that fits two 3-way switches in one gang box",
      "compact single gang size for three switches",
      "perfect fit",
      "1 gang standard size matching US household switches",
      "larger than normal switch, takes more room in electrical box"
    ]
  },
  {
    "category": "Color and Finish",
    "categoryType": "Physical",
    "mentions": 10,
    "satisfactionRate": 61.9,
    "negativeRate": 38.1,
    "positiveCount": 13,
    "negativeCount": 8,
    "totalReviews": 21,
    "averageRating": 4.05,
    "topNegativeAspects": [
      "off-white or bone color rather than pure white",
      "stark white color vs off-white decor",
      "almond color instead of advertised white",
      "cream color",
      "ivory paddle slightly lighter shade than other switches"
    ],
    "topPositiveAspects": [
      "available in black color",
      "white toggle with ivory body",
      "color matches nicely",
      "ivory switch paddle included",
      "bone/white switches included"
    ]
  },
  {
    "category": "Tactile Feedback",
    "categoryType": "Physical",
    "mentions": 24,
    "satisfactionRate": 65.0,
    "negativeRate": 35.0,
    "positiveCount": 13,
    "negativeCount": 7,
    "totalReviews": 20,
    "averageRating": 4.3,
    "topNegativeAspects": [
      "loud click sound",
      "stiff click action",
      "clicks up and down feel sticky",
      "Soft bump feeling instead of click",
      "switches feel hard and cheap when operating"
    ],
    "topPositiveAspects": [
      "nice positive click",
      "audible click which some prefer",
      "positive snap action",
      "crisp click when switching",
      "positive action"
    ]
  },
  {
    "category": "Wiring Configuration",
    "categoryType": "Physical",
    "mentions": 8,
    "satisfactionRate": 66.7,
    "negativeRate": 33.3,
    "positiveCount": 6,
    "negativeCount": 3,
    "totalReviews": 9,
    "averageRating": 4.33,
    "topNegativeAspects": [
      "Has holes on the back for hookup",
      "Ground terminal is hard to work with",
      "has 5 stranded wires with wire nuts"
    ],
    "topPositiveAspects": [
      "requires neutral wire for installation",
      "both screws and push-in connections on the back",
      "Metal tab for different switching arrangements",
      "Slightly different wiring configuration than other brands",
      "requires neutral wire"
    ]
  },
  {
    "category": "Specialized Components",
    "categoryType": "Physical",
    "mentions": 11,
    "satisfactionRate": 66.7,
    "negativeRate": 33.3,
    "positiveCount": 8,
    "negativeCount": 4,
    "totalReviews": 12,
    "averageRating": 3.92,
    "topNegativeAspects": [
      "doesn't take 3 prong plugs",
      "No strain relief feature",
      "Clear switch bat material",
      "learn button can easily get bumped by wires"
    ],
    "topPositiveAspects": [
      "has two outlets",
      "second and third sockets function differently",
      "away mode will trigger with any noise",
      "Little hole for photocell sensor",
      "Day/night sensor tiny hole in switch"
    ]
  },
  {
    "category": "Wire Configuration",
    "categoryType": "Physical",
    "mentions": 7,
    "satisfactionRate": 66.7,
    "negativeRate": 33.3,
    "positiveCount": 6,
    "negativeCount": 3,
    "totalReviews": 9,
    "averageRating": 4.56,
    "topNegativeAspects": [
      "six inch braided aluminum wire for neutral",
      "Screw colors don't match standard",
      "All wires on same side when flipped"
    ],
    "topPositiveAspects": [
      "requires four wires",
      "Different wiring than standard switches",
      "Inputs on left side, outputs on right side",
      "direction of wires labels with different colors are clear"
    ]
  },
  {
    "category": "Internal Components",
    "categoryType": "Physical",
    "mentions": 12,
    "satisfactionRate": 66.7,
    "negativeRate": 33.3,
    "positiveCount": 10,
    "negativeCount": 5,
    "totalReviews": 15,
    "averageRating": 3.53,
    "topNegativeAspects": [
      "has a lot of pieces inside",
      "thin plastic section across center as weak support",
      "rocker tab inside held by center plastic",
      "top rocker tab",
      "Toggle component"
    ],
    "topPositiveAspects": [
      "metal tab connecting the two switches",
      "has side pieces that need to be snipped to separate switches",
      "posts are offset on opposite sides",
      "rocks side to side",
      "opposite ON positions for top and bottom switches"
    ]
  },
  {
    "category": "Light Sensor Functionality",
    "categoryType": "Physical",
    "mentions": 4,
    "satisfactionRate": 66.7,
    "negativeRate": 33.3,
    "positiveCount": 4,
    "negativeCount": 2,
    "totalReviews": 6,
    "averageRating": 4.33,
    "topNegativeAspects": [
      "Sensor requires a lot of light to keep nightlight off",
      "Sensor sensitivity cannot be adjusted"
    ],
    "topPositiveAspects": [
      "Has light sensor that turns off nightlight during day",
      "day/night sensor (tiny hole) is sensitive"
    ]
  },
  {
    "category": "Visual Appearance and Aesthetics",
    "categoryType": "Physical",
    "mentions": 104,
    "satisfactionRate": 67.3,
    "negativeRate": 32.7,
    "positiveCount": 101,
    "negativeCount": 49,
    "totalReviews": 150,
    "averageRating": 3.77,
    "topNegativeAspects": [
      "embossed LEVITON logo on bottom left corner",
      "Vendor name stamped into the plate",
      "raised LEVITON letters on face",
      "color does not match other BESTTEN switches",
      "does not match own outlets/cover plates"
    ],
    "topPositiveAspects": [
      "nice looking",
      "attractive visual appearance",
      "looks nice and modern",
      "good appearance",
      "modern look"
    ]
  },
  {
    "category": "Color and Finish Options",
    "categoryType": "Physical",
    "mentions": 34,
    "satisfactionRate": 69.2,
    "negativeRate": 30.8,
    "positiveCount": 45,
    "negativeCount": 20,
    "totalReviews": 65,
    "averageRating": 4.02,
    "topNegativeAspects": [
      "Yellow appearance instead of gold",
      "white color instead of light almond",
      "doesn't match existing switches",
      "Matte finish looks and feels like unfinished plastic",
      "not real white"
    ],
    "topPositiveAspects": [
      "gray color matches well with other brands and fixtures",
      "Gold color appearance",
      "black color",
      "brown color available",
      "Brushed gold finish"
    ]
  },
  {
    "category": "Night Light Features",
    "categoryType": "Physical",
    "mentions": 7,
    "satisfactionRate": 72.7,
    "negativeRate": 27.3,
    "positiveCount": 16,
    "negativeCount": 6,
    "totalReviews": 22,
    "averageRating": 4.23,
    "topNegativeAspects": [
      "light brightness appropriate for nighttime",
      "light always stays on",
      "light color is green",
      "only upper left corner lights up",
      "light is very dim when toggle is off"
    ],
    "topPositiveAspects": [
      "light brightness appropriate for nighttime",
      "has illuminated border/surround",
      "provides white light"
    ]
  },
  {
    "category": "Build Quality and Materials",
    "categoryType": "Physical",
    "mentions": 123,
    "satisfactionRate": 77.8,
    "negativeRate": 22.2,
    "positiveCount": 144,
    "negativeCount": 41,
    "totalReviews": 185,
    "averageRating": 4.28,
    "topNegativeAspects": [
      "Cheaply made",
      "low build quality",
      "cheaply made",
      "cheaply built",
      "cheap construction quality"
    ],
    "topPositiveAspects": [
      "Good quality construction",
      "well made",
      "good quality",
      "Solid construction",
      "well made construction"
    ]
  },
  {
    "category": "Visual Design",
    "categoryType": "Performance",
    "mentions": 10,
    "satisfactionRate": 80.0,
    "negativeRate": 20.0,
    "positiveCount": 4,
    "negativeCount": 1,
    "totalReviews": 5,
    "averageRating": 4.6,
    "topNegativeAspects": [
      "small border around the switch"
    ],
    "topPositiveAspects": [
      "no on/off words on toggle",
      "face plate makes the product look amazing"
    ]
  },
  {
    "category": "Color Quality",
    "categoryType": "Physical",
    "mentions": 5,
    "satisfactionRate": 80.0,
    "negativeRate": 20.0,
    "positiveCount": 4,
    "negativeCount": 1,
    "totalReviews": 5,
    "averageRating": 4.6,
    "topNegativeAspects": [
      "off white color rather than pure white"
    ],
    "topPositiveAspects": [
      "good color",
      "white color that matches other switches",
      "white color",
      "nice clean bright white not off white"
    ]
  },
  {
    "category": "Faceplate and Cover Components",
    "categoryType": "Physical",
    "mentions": 9,
    "satisfactionRate": 83.3,
    "negativeRate": 16.7,
    "positiveCount": 10,
    "negativeCount": 2,
    "totalReviews": 12,
    "averageRating": 4.5,
    "topNegativeAspects": [
      "Missing plates in order",
      "face plate smaller than expected"
    ],
    "topPositiveAspects": [
      "comes with cover plates",
      "Comes with screwless wall plate",
      "Includes the cover plate",
      "Matched light switch cover",
      "cover plate good quality"
    ]
  },
  {
    "category": "Button and Control Interface",
    "categoryType": "Physical",
    "mentions": 15,
    "satisfactionRate": 85.0,
    "negativeRate": 15.0,
    "positiveCount": 17,
    "negativeCount": 3,
    "totalReviews": 20,
    "averageRating": 3.2,
    "topNegativeAspects": [
      "physical switch button",
      "physical button that no longer moves",
      "no up switch"
    ],
    "topPositiveAspects": [
      "physical button controls",
      "push button design",
      "touch-sensitive buttons that don't physically push in",
      "nice large switches",
      "has physical switch right on unit"
    ]
  },
  {
    "category": "Manufacturing Origin",
    "categoryType": "Physical",
    "mentions": 5,
    "satisfactionRate": 85.7,
    "negativeRate": 14.3,
    "positiveCount": 6,
    "negativeCount": 1,
    "totalReviews": 7,
    "averageRating": 4.57,
    "topNegativeAspects": [
      "made in Mexico not USA"
    ],
    "topPositiveAspects": [
      "made in USA",
      "made in Korea"
    ]
  },
  {
    "category": "Power Specifications",
    "categoryType": "Physical",
    "mentions": 11,
    "satisfactionRate": 87.5,
    "negativeRate": 12.5,
    "positiveCount": 21,
    "negativeCount": 3,
    "totalReviews": 24,
    "averageRating": 4.5,
    "topNegativeAspects": [
      "10 Amp capacity limitation",
      "15a current rating",
      "Actual product part number rated for 15 amps despite 20 amp advertising"
    ],
    "topPositiveAspects": [
      "20 amp rating",
      "20 amp switch capability",
      "15Amp 120V capacity",
      "rated for 15 Amp outlets",
      "current rating for LED lights considerably higher than alternatives"
    ]
  },
  {
    "category": "Construction Quality",
    "categoryType": "Physical",
    "mentions": 27,
    "satisfactionRate": 91.9,
    "negativeRate": 8.1,
    "positiveCount": 34,
    "negativeCount": 3,
    "totalReviews": 37,
    "averageRating": 4.62,
    "topNegativeAspects": [
      "designed bend lines from fabrication",
      "plastic molded with side clips",
      "not real sturdy but good enough"
    ],
    "topPositiveAspects": [
      "Quality construction",
      "solid and sturdy feel",
      "Well constructed",
      "well constructed",
      "Well-made construction"
    ]
  },
  {
    "category": "Electrical Wiring",
    "categoryType": "Physical",
    "mentions": 7,
    "satisfactionRate": 93.3,
    "negativeRate": 6.7,
    "positiveCount": 14,
    "negativeCount": 1,
    "totalReviews": 15,
    "averageRating": 3.6,
    "topNegativeAspects": [
      "wiring design specifications require ingenuity for existing three-way switch"
    ],
    "topPositiveAspects": [
      "no neutral wire requirement",
      "four connection wires pre-installed with plenty of slack",
      "includes neutral wire with tinned ends",
      "wire connectors are sturdy",
      "Comes with own stranded wires attached, no screw posts"
    ]
  },
  {
    "category": "Build Construction",
    "categoryType": "Physical",
    "mentions": 8,
    "satisfactionRate": 94.7,
    "negativeRate": 5.3,
    "positiveCount": 18,
    "negativeCount": 1,
    "totalReviews": 19,
    "averageRating": 4.63,
    "topNegativeAspects": [
      "Has gaps at the top of the switch"
    ],
    "topPositiveAspects": [
      "Heavy duty construction",
      "good quality",
      "Solid/sturdy build",
      "quality made",
      "solidly made and not flimsy"
    ]
  },
  {
    "category": "Visual Aesthetics",
    "categoryType": "Physical",
    "mentions": 86,
    "satisfactionRate": 96.9,
    "negativeRate": 3.1,
    "positiveCount": 124,
    "negativeCount": 4,
    "totalReviews": 128,
    "averageRating": 4.75,
    "topNegativeAspects": [
      "Lacks metallic quality",
      "company name impressed into plastic",
      "look-and-feel of original Caseta dimmers"
    ],
    "topPositiveAspects": [
      "Nice looking/beautiful appearance",
      "Modern and clean look",
      "looks great and modern style",
      "clean look",
      "attractive and modern looking"
    ]
  },
  {
    "category": "Visual Appearance",
    "categoryType": "Physical",
    "mentions": 41,
    "satisfactionRate": 97.4,
    "negativeRate": 2.6,
    "positiveCount": 37,
    "negativeCount": 1,
    "totalReviews": 38,
    "averageRating": 4.53,
    "topNegativeAspects": [
      "not aesthetically pleasing"
    ],
    "topPositiveAspects": [
      "looks great",
      "looks good",
      "Looks great",
      "modern appearance",
      "sleek decorator-style design"
    ]
  },
  {
    "category": "Hardware Components",
    "categoryType": "Performance",
    "mentions": 3,
    "satisfactionRate": 100.0,
    "negativeRate": 0.0,
    "positiveCount": 1,
    "negativeCount": 0,
    "totalReviews": 1,
    "averageRating": 5.0,
    "topNegativeAspects": [],
    "topPositiveAspects": [
      "use standard screws and decora plates"
    ]
  },
  {
    "category": "Touch Interface",
    "categoryType": "Physical",
    "mentions": 1,
    "satisfactionRate": 100.0,
    "negativeRate": 0.0,
    "positiveCount": 1,
    "negativeCount": 0,
    "totalReviews": 1,
    "averageRating": 5.0,
    "topNegativeAspects": [],
    "topPositiveAspects": [
      "light touch feature that elevates the product"
    ]
  },
  {
    "category": "Color Options",
    "categoryType": "Physical",
    "mentions": 3,
    "satisfactionRate": 100.0,
    "negativeRate": 0.0,
    "positiveCount": 7,
    "negativeCount": 0,
    "totalReviews": 7,
    "averageRating": 5.0,
    "topNegativeAspects": [],
    "topPositiveAspects": [
      "white color"
    ]
  },
  {
    "category": "Product Certification",
    "categoryType": "Physical",
    "mentions": 2,
    "satisfactionRate": 100.0,
    "negativeRate": 0.0,
    "positiveCount": 3,
    "negativeCount": 0,
    "totalReviews": 3,
    "averageRating": 3.67,
    "topNegativeAspects": [],
    "topPositiveAspects": [
      "UL certified",
      "meets CSA"
    ]
  },
  {
    "category": "Color and Finish Quality",
    "categoryType": "Physical",
    "mentions": 1,
    "satisfactionRate": 100.0,
    "negativeRate": 0.0,
    "positiveCount": 1,
    "negativeCount": 0,
    "totalReviews": 1,
    "averageRating": 5.0,
    "topNegativeAspects": [],
    "topPositiveAspects": [
      "nice finish"
    ]
  },
  {
    "category": "Multi-Switch Configuration",
    "categoryType": "Physical",
    "mentions": 2,
    "satisfactionRate": 100.0,
    "negativeRate": 0.0,
    "positiveCount": 3,
    "negativeCount": 0,
    "totalReviews": 3,
    "averageRating": 3.67,
    "topNegativeAspects": [],
    "topPositiveAspects": [
      "dual switches in single gang box",
      "two switches in the space of one"
    ]
  },
  {
    "category": "Terminal Design",
    "categoryType": "Physical",
    "mentions": 4,
    "satisfactionRate": 100.0,
    "negativeRate": 0.0,
    "positiveCount": 4,
    "negativeCount": 0,
    "totalReviews": 4,
    "averageRating": 4.0,
    "topNegativeAspects": [],
    "topPositiveAspects": [
      "screw terminals with clamp down style",
      "multiple wire entries at each terminal",
      "all connections via screw terminals",
      "no wire leads from switch"
    ]
  },
  {
    "category": "Switch Plate Design",
    "categoryType": "Physical",
    "mentions": 14,
    "satisfactionRate": 100.0,
    "negativeRate": 0.0,
    "positiveCount": 16,
    "negativeCount": 0,
    "totalReviews": 16,
    "averageRating": 4.81,
    "topNegativeAspects": [],
    "topPositiveAspects": [
      "modern looking paddle/rocker design",
      "paddle design",
      "paddle rocker design",
      "paddle design is smooth",
      "paddle design matches existing switches"
    ]
  },
  {
    "category": "Specialized Controls",
    "categoryType": "Physical",
    "mentions": 2,
    "satisfactionRate": 100.0,
    "negativeRate": 0.0,
    "positiveCount": 2,
    "negativeCount": 0,
    "totalReviews": 2,
    "averageRating": 3.0,
    "topNegativeAspects": [],
    "topPositiveAspects": [
      "has two sensitivity settings",
      "can adjust noise sensitivity to high or low"
    ]
  },
  {
    "category": "Touchscreen Interface",
    "categoryType": "Physical",
    "mentions": 2,
    "satisfactionRate": 100.0,
    "negativeRate": 0.0,
    "positiveCount": 2,
    "negativeCount": 0,
    "totalReviews": 2,
    "averageRating": 4.5,
    "topNegativeAspects": [],
    "topPositiveAspects": [
      "LCD touchscreen",
      "touch screen functionality"
    ]
  },
  {
    "category": "Illumination Features",
    "categoryType": "Physical",
    "mentions": 1,
    "satisfactionRate": 100.0,
    "negativeRate": 0.0,
    "positiveCount": 1,
    "negativeCount": 0,
    "totalReviews": 1,
    "averageRating": 1.0,
    "topNegativeAspects": [],
    "topPositiveAspects": [
      "has indicator light"
    ]
  },
  {
    "category": "Structural Durability",
    "categoryType": "Physical",
    "mentions": 6,
    "satisfactionRate": 100.0,
    "negativeRate": 0.0,
    "positiveCount": 11,
    "negativeCount": 0,
    "totalReviews": 11,
    "averageRating": 4.73,
    "topNegativeAspects": [],
    "topPositiveAspects": [
      "feels like good quality",
      "sturdy build quality",
      "well put together",
      "hefty and durable feeling",
      "rugged design"
    ]
  }
];

// 获取指定产品类型的分类反馈数据
export function getCategoryFeedback(productType: ProductType = 'dimmer'): CategoryFeedbackData {
  if (productType === 'dimmer') {
    return {
      summary: dimmerSwitchesSummary,
      topNegativeCategories: topNegativeDimmerCategories,
      topPositiveCategories: topPositiveDimmerCategories,
      topUseCases: topUseCasesDimmer,
      allCategories: allDimmerCategories
    };
  } else {
    return {
      summary: lightSwitchesSummary,
      topNegativeCategories: topNegativeLightCategories,
      topPositiveCategories: topPositiveLightCategories,
      topUseCases: topUseCasesLight,
      allCategories: allLightCategories
    };
  }
}

// 获取Top N负面分类
export function getTopNegativeCategories(productType: ProductType = 'dimmer', limit: number = 10): CategoryFeedback[] {
  const data = getCategoryFeedback(productType);
  return data.topNegativeCategories.slice(0, limit);
}

// 获取Top N正面分类
export function getTopPositiveCategories(productType: ProductType = 'dimmer', limit: number = 10): CategoryFeedback[] {
  const data = getCategoryFeedback(productType);
  return data.topPositiveCategories.slice(0, limit);
}

// 获取Top N使用场景
export function getTopUseCases(productType: ProductType = 'dimmer', limit: number = 10): UseCaseFeedback[] {
  const data = getCategoryFeedback(productType);
  return data.topUseCases.slice(0, limit);
}

// 按分类类型筛选
export function getCategoriesByType(categoryType: 'Physical' | 'Performance', productType: ProductType = 'dimmer'): CategoryFeedback[] {
  const data = getCategoryFeedback(productType);
  return data.allCategories.filter(cat => cat.categoryType === categoryType);
}

// 获取所有可用的产品类型
export function getAvailableProductTypes(): { value: ProductType; label: string }[] {
  return [
    { value: 'dimmer', label: 'Dimmer Switches' },
    { value: 'light', label: 'Light Switches' }
  ];
}
