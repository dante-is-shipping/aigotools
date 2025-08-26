// 在文件最顶部添加
import { config } from 'dotenv';
import { join } from 'path';

// 手动加载 .env.local 文件
config({ path: join(process.cwd(), '.env.local') });

import { initIndieCategories } from "../lib/init-indie-categories";
import { CategoryModel } from "../models/category";
import dbConnect from "../lib/db-connect";

// 分类管理命令
const commands = {
  init: initIndieCategories,
  list: listCategories,
  clear: clearCategories,
  stats: showStats,
};

async function listCategories() {
  await dbConnect();

  const categories = await CategoryModel.find({}).sort({ weight: -1, name: 1 });

  console.log("\n📋 当前分类列表:");
  console.log("====================");

  const mainCategories = categories.filter(cat => !cat.parent);

  for (const mainCat of mainCategories) {
    console.log(`\n🏷️  ${mainCat.icon} ${mainCat.name} (${mainCat.slug})`);
    console.log(`   权重: ${mainCat.weight} | 特色: ${mainCat.featured ? '是' : '否'}`);
    console.log(`   描述: ${mainCat.description || '无'}`);

    const subCategories = categories.filter(cat =>
      cat.parent && cat.parent.toString() === mainCat._id.toString()
    );

    if (subCategories.length > 0) {
      console.log(`   子分类 (${subCategories.length}个):`);
      subCategories.forEach(subCat => {
        console.log(`     └─ ${subCat.icon} ${subCat.name} (${subCat.slug})`);
      });
    }
  }

  console.log(`\n📊 统计: 主分类 ${mainCategories.length} 个，子分类 ${categories.length - mainCategories.length} 个`);
}

async function clearCategories() {
  await dbConnect();

  const result = await CategoryModel.deleteMany({});
  console.log(`🗑️ 已删除 ${result.deletedCount} 个分类`);
}

async function showStats() {
  await dbConnect();

  const totalCategories = await CategoryModel.countDocuments();
  const mainCategories = await CategoryModel.countDocuments({ parent: null });
  const subCategories = totalCategories - mainCategories;
  const featuredCategories = await CategoryModel.countDocuments({ featured: true });

  console.log("\n📊 分类统计信息:");
  console.log("==================");
  console.log(`总分类数: ${totalCategories}`);
  console.log(`主分类数: ${mainCategories}`);
  console.log(`子分类数: ${subCategories}`);
  console.log(`特色分类: ${featuredCategories}`);

  // 按目标受众统计
  const categories = await CategoryModel.find({});
  const audienceStats = {};

  categories.forEach(cat => {
    if (cat.targetAudience && cat.targetAudience.length > 0) {
      cat.targetAudience.forEach(audience => {
        audienceStats[audience] = (audienceStats[audience] || 0) + 1;
      });
    }
  });

  console.log("\n👥 目标受众分布:");
  Object.entries(audienceStats).forEach(([audience, count]) => {
    console.log(`${audience}: ${count} 个分类`);
  });
}

// 命令行参数处理
const command = process.argv[2];

if (!command || !commands[command]) {
  console.log("\n🛠️ 分类管理工具");
  console.log("=================");
  console.log("可用命令:");
  console.log("  init  - 初始化独立开发工具站分类数据");
  console.log("  list  - 列出所有分类");
  console.log("  clear - 清空所有分类数据");
  console.log("  stats - 显示分类统计信息");
  console.log("\n使用方法: npm run categories <command>");
  process.exit(1);
}

// 执行命令
commands[command]()
  .then(() => {
    console.log(`\n✅ 命令 '${command}' 执行完成`);
    process.exit(0);
  })
  .catch((error) => {
    console.error(`\n❌ 命令 '${command}' 执行失败:`, error);
    process.exit(1);
  });