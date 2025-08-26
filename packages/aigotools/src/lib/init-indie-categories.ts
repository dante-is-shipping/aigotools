import { CategoryModel } from "@/models/category";
import dbConnect from "@/lib/db-connect";

// Independent developer tools site category data
const indieCategories = [
  {
    name: "AI Tools",
    slug: "ai-tools",
    icon: "🤖",
    color: "#EF4444",
    description: "AI-assisted development, content generation, automation tools",
    targetAudience: ["all"],
    featured: true,
    weight: 100,
    parent: null,
  },
  {
    name: "Design Resources",
    slug: "design-resources",
    icon: "🎨",
    color: "#EC4899",
    description: "UI/UX design, icons, materials and other resources",
    targetAudience: ["designer", "developer"],
    featured: true,
    weight: 90,
    parent: null,
  },
  {
    name: "Deployment & DevOps",
    slug: "deployment-ops",
    icon: "🚀",
    color: "#10B981",
    description: "Deployment, monitoring, DevOps related services",
    targetAudience: ["developer"],
    featured: true,
    weight: 80,
    parent: null,
  },
  {
    name: "Product Discovery",
    slug: "product-discovery",
    icon: "🔍",
    color: "#FF6B6B",
    description: "Product showcase, launch platforms, community promotion",
    targetAudience: ["entrepreneur"],
    featured: true,
    weight: 75,
    parent: null,
  },
  {
    name: "Monetization",
    slug: "monetization",
    icon: "💰",
    color: "#F59E0B",
    description: "Payment, subscription, revenue analytics and monetization tools",
    targetAudience: ["entrepreneur", "developer"],
    featured: true,
    weight: 70,
    parent: null,
  },
  {
    name: "Marketing",
    slug: "marketing",
    icon: "📢",
    color: "#8B5CF6",
    description: "SEO, social media, content marketing tools",
    targetAudience: ["marketer", "entrepreneur"],
    featured: true,
    weight: 60,
    parent: null,
  },
  {
    name: "Analytics",
    slug: "analytics",
    icon: "📊",
    color: "#06B6D4",
    description: "User behavior, performance monitoring, data visualization",
    targetAudience: ["developer", "marketer"],
    featured: true,
    weight: 50,
    parent: null,
  },
  {
    name: "Learning Resources",
    slug: "learning-resources",
    icon: "📚",
    color: "#4ECDC4",
    description: "Tutorials, courses, technical documentation, development guides",
    targetAudience: ["developer"],
    featured: true,
    weight: 45,
    parent: null,
  },
  {
    name: "Community Tools",
    slug: "community-tools",
    icon: "👥",
    color: "#45B7D1",
    description: "Community building, user interaction, feedback collection",
    targetAudience: ["entrepreneur"],
    featured: true,
    weight: 35,
    parent: null,
  }
];

// Subcategory data (parent references will be added after main categories are created)
const indieSubCategories = [

  // Design Resources subcategories
  {
    name: "UI Component Libraries",
    slug: "ui-components",
    icon: "🧩",
    color: "#EC4899",
    description: "React, Vue, Angular component libraries",
    targetAudience: ["developer", "designer"],
    parentSlug: "design-resources",
  },
  {
    name: "Icon Resources",
    slug: "icons",
    icon: "⭐",
    color: "#EC4899",
    description: "Free icons, icon fonts, SVG icons",
    targetAudience: ["designer", "developer"],
    parentSlug: "design-resources",
  },
  {
    name: "Font Resources",
    slug: "fonts",
    icon: "🔤",
    color: "#EC4899",
    description: "Free fonts, web fonts, font tools",
    targetAudience: ["designer"],
    parentSlug: "design-resources",
  },
  {
    name: "Color Tools",
    slug: "color-tools",
    icon: "🎨",
    color: "#EC4899",
    description: "Color palettes, color schemes, color tools",
    targetAudience: ["designer"],
    parentSlug: "design-resources",
  },
  {
    name: "Design Tools",
    slug: "design-tools",
    icon: "✏️",
    color: "#EC4899",
    description: "Online design, prototyping tools, design software",
    targetAudience: ["designer"],
    parentSlug: "design-resources",
  },

  // Deployment & DevOps subcategories
  {
    name: "Cloud Services",
    slug: "cloud-services",
    icon: "☁️",
    color: "#10B981",
    description: "AWS, Azure, GCP and other cloud platforms",
    targetAudience: ["developer"],
    parentSlug: "deployment-ops",
  },
  {
    name: "CI/CD",
    slug: "cicd",
    icon: "🔄",
    color: "#10B981",
    description: "Continuous integration, continuous deployment, automation pipelines",
    targetAudience: ["developer"],
    parentSlug: "deployment-ops",
  },
  {
    name: "Monitoring & Alerting",
    slug: "monitoring",
    icon: "📈",
    color: "#10B981",
    description: "Performance monitoring, log analysis, alerting systems",
    targetAudience: ["developer"],
    parentSlug: "deployment-ops",
  },
  {
    name: "Domain & DNS",
    slug: "domain-dns",
    icon: "🌐",
    color: "#10B981",
    description: "Domain registration, DNS management, CDN services",
    targetAudience: ["developer"],
    parentSlug: "deployment-ops",
  },

  // Monetization subcategories
  {
    name: "Payment Integration",
    slug: "payment-integration",
    icon: "💳",
    color: "#F59E0B",
    description: "Stripe, PayPal, Alipay and other payment tools",
    targetAudience: ["developer", "entrepreneur"],
    parentSlug: "monetization",
  },
  {
    name: "Revenue Analytics",
    slug: "revenue-analytics",
    icon: "📊",
    color: "#F59E0B",
    description: "Revenue statistics, financial reports, tax tools",
    targetAudience: ["entrepreneur"],
    parentSlug: "monetization",
  },

  // Marketing subcategories
  {
    name: "SEO Tools",
    slug: "seo-tools",
    icon: "🔍",
    color: "#8B5CF6",
    description: "Keyword analysis, ranking monitoring, SEO optimization",
    targetAudience: ["marketer"],
    parentSlug: "marketing",
  },
  {
    name: "Social Media",
    slug: "social-media",
    icon: "📱",
    color: "#8B5CF6",
    description: "Social media management, content publishing, follower growth",
    targetAudience: ["marketer"],
    parentSlug: "marketing",
  },
  {
    name: "Email Marketing",
    slug: "email-marketing",
    icon: "📧",
    color: "#8B5CF6",
    description: "Email campaigns, marketing automation, email templates",
    targetAudience: ["marketer"],
    parentSlug: "marketing",
  },
  {
    name: "Content Marketing",
    slug: "content-marketing",
    icon: "📝",
    color: "#8B5CF6",
    description: "Blog tools, content management, copywriting generation",
    targetAudience: ["marketer"],
    parentSlug: "marketing",
  },
  {
    name: "Advertising",
    slug: "advertising",
    icon: "📢",
    color: "#8B5CF6",
    description: "Google Ads, Facebook Ads, advertising optimization",
    targetAudience: ["marketer"],
    parentSlug: "marketing",
  },

  // Analytics subcategories
  {
    name: "Web Analytics",
    slug: "web-analytics",
    icon: "📊",
    color: "#06B6D4",
    description: "Google Analytics, user behavior analysis",
    targetAudience: ["marketer", "developer"],
    parentSlug: "analytics",
  },
  {
    name: "User Feedback",
    slug: "user-feedback",
    icon: "💬",
    color: "#06B6D4",
    description: "User research, feedback collection, satisfaction surveys",
    targetAudience: ["marketer"],
    parentSlug: "analytics",
  },
  {
    name: "A/B Testing",
    slug: "ab-testing",
    icon: "🧪",
    color: "#06B6D4",
    description: "Conversion rate optimization, experiment platforms, data-driven decisions",
    targetAudience: ["marketer", "developer"],
    parentSlug: "analytics",
  },
  {
    name: "Data Visualization",
    slug: "data-visualization",
    icon: "📈",
    color: "#06B6D4",
    description: "Chart tools, dashboards, report generation",
    targetAudience: ["developer"],
    parentSlug: "analytics",
  },

  // AI Tools subcategories
  {
    name: "Code Generation",
    slug: "code-generation",
    icon: "🤖",
    color: "#EF4444",
    description: "AI code assistants, automated programming, code completion",
    targetAudience: ["developer"],
    parentSlug: "ai-tools",
  },
  {
    name: "Content Generation",
    slug: "content-generation",
    icon: "✍️",
    color: "#EF4444",
    description: "AI writing, image generation, video creation",
    targetAudience: ["all"],
    parentSlug: "ai-tools",
  },
  {
    name: "AI Prompts",
    slug: "ai-prompts",
    icon: "💡",
    color: "#EF4444",
    description: "ChatGPT prompts, AI conversation templates",
    targetAudience: ["all"],
    parentSlug: "ai-tools",
  },
  {
    name: "MCP Resources",
    slug: "mcp-resources",
    icon: "🔌",
    color: "#EF4444",
    description: "Model Context Protocol configurations and tools",
    targetAudience: ["developer"],
    parentSlug: "ai-tools",
  },
  {
    name: "Product Launch",
    slug: "product-launch",
    icon: "🚀",
    color: "#F59E0B",
    description: "Product Hunt, Hacker News and other launch platforms",
    targetAudience: ["entrepreneur"],
    parentSlug: "product-discovery",
  },
  {
    name: "Indie Developer Communities",
    slug: "indie-communities",
    icon: "🏠",
    color: "#F59E0B",
    description: "Indie Hackers, Reddit and other indie developer communities",
    targetAudience: ["entrepreneur"],
    parentSlug: "community-tools",
  }
];

export async function initIndieCategories() {
  try {
    await dbConnect();

    console.log("Starting initialization of indie developer tools site category data...");

    // 1. Create main categories
    const createdMainCategories = new Map();

    for (const category of indieCategories) {
      const existingCategory = await CategoryModel.findOne({ slug: category.slug });

      if (!existingCategory) {
        const newCategory = await CategoryModel.create({
          ...category,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });
        createdMainCategories.set(category.slug, newCategory._id);
        console.log(`✅ Created main category: ${category.name}`);
      } else {
        createdMainCategories.set(category.slug, existingCategory._id);
        console.log(`⚠️ Main category already exists: ${category.name}`);
      }
    }

    // 2. Create subcategories
    for (const subCategory of indieSubCategories) {
      const parentId = createdMainCategories.get(subCategory.parentSlug);

      if (!parentId) {
        console.error(`❌ Parent category not found: ${subCategory.parentSlug}`);
        continue;
      }

      const existingSubCategory = await CategoryModel.findOne({ slug: subCategory.slug });

      if (!existingSubCategory) {
        const { parentSlug, ...categoryData } = subCategory;
        await CategoryModel.create({
          ...categoryData,
          parent: parentId,
          featured: false,
          weight: 0,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });
        console.log(`✅ Created subcategory: ${subCategory.name}`);
      } else {
        console.log(`⚠️ Subcategory already exists: ${subCategory.name}`);
      }
    }

    console.log("🎉 Indie developer tools site category data initialization completed!");

  } catch (error) {
    console.error("❌ Category data initialization failed:", error);
    throw error;
  }
}

// If running this script directly
if (require.main === module) {
  initIndieCategories()
    .then(() => {
      console.log("Category initialization completed");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Category initialization failed:", error);
      process.exit(1);
    });
}