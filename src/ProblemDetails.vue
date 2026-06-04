<template>
  <nav class="breadcrumb">
    <span class="crumb" @click="goHome">Easy</span>
    <span class="sep">›</span>
    <span class="current">{{ problem.title }}</span>
  </nav>
  <div class="page">
    <div class="header">
      <h1>{{ problem.title }}</h1>

      <button v-if="isTeacher" class="icon-btn" title="Edit Question">
        <Pencil :size="18" />
      </button>
    </div>

    <div class="content" :class="{ teacherView: isTeacher }">
      <div class="description">
        <h2>Description</h2>

        <p>
          {{ problem.description }}
        </p>

        <button class="tutorial-btn"><BookOpen :size="18" />Tutorial</button>
      </div>

      <div v-if="!isTeacher" class="starter-code">
        <h2>Starter Code</h2>

        <pre
          >{{ problem.code }}
        </pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Pencil } from "lucide-vue-next";
import { useRouter } from 'vue-router'
import { BookOpen } from 'lucide-vue-next'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
const isTeacher = false;

const problem = {
  id: 1,
  title: "Two Sum",
  description: "Find two numbers whose sum equals the target.",
  code: `function twoSum(nums, target){

}`,
};
</script>

<style scoped>
.breadcrumb {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 999px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.05);
}

.crumb {
  color: #2563eb;
  font-weight: 600;
  cursor: pointer;
}

.crumb:hover {
  text-decoration: underline;
}

.sep {
  color: #9ca3af;
  font-size: 16px;
}

.current {
  color: #111827;
  font-weight: 700;
}
.page {
  padding: 40px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.content.teacherView {
  grid-template-columns: 1fr;
}
.description,
.starter-code {
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 20px;
}

.edit-btn {
  padding: 10px 16px;
}

.tutorial-btn {
  margin-top: 24px;

  display: inline-flex;
  align-items: center;
  gap: 10px;

  padding: 14px 28px;

  border: none;
  border-radius: 999px;

  background: linear-gradient(
    135deg,
    #f8fafc 0%,
    #eef2ff 100%
  );

  color: #1e293b;
  font-size: 15px;
  font-weight: 600;

  cursor: pointer;

  box-shadow:
    0 4px 14px rgba(99, 102, 241, 0.15);

  transition: all 0.25s ease;
}

.tutorial-btn:hover {
  transform: translateY(-2px);

  box-shadow:
    0 10px 25px rgba(99, 102, 241, 0.25);

  background: linear-gradient(
    135deg,
    #ffffff 0%,
    #e0e7ff 100%
  );
}

.tutorial-btn:active {
  transform: translateY(0);
}

pre {
  white-space: pre-wrap;
}
.icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.icon-btn:hover {
  background: #f9fafb;
  transform: translateY(-1px);
}
</style>
