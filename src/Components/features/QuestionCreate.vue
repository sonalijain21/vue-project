<template>
  <div class="page">
    <div class="form-card">
      <div class="header">
        <h1>Add New Question</h1>
        <p>Create a new SQL challenge for students.</p>
      </div>

      <form @submit.prevent="saveQuestion" class="form">
        <div class="field">
          <label>Title</label>
          <input
            v-model="title"
            type="text"
            placeholder="e.g. Find Employees with Salary > 50000"
          />
        </div>

        <div class="field">
          <label>Description</label>
          <textarea
            v-model="description"
            rows="6"
            placeholder="Write the problem statement..."
          />
        </div>

        <div class="field">
          <label>Tutorial / Explanation</label>
          <textarea
            v-model="tutorial"
            rows="10"
            placeholder="Provide explanation, hints, or walkthrough..."
          />
        </div>

        <div class="actions">
          <button
            type="button"
            class="cancel-btn"
            @click="router.push('/')"
          >
            Cancel
          </button>

          <button type="submit" class="save-btn">
            Save Question
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { supabase } from '@/lib/supabase'

const router = useRouter()

const title = ref('')
const description = ref('')
const tutorial = ref('')

const route = useRoute()
const difficulty = ref<string>((route.query.difficulty as string) ?? 'Easy')

async function saveQuestion() {
  const { error } = await supabase.from('problems').insert({
    title: title.value,
    description: description.value,
    tutorial: tutorial.value,
    difficulty: difficulty.value,
  })

  if (error) {
    console.error(error.message)
    return
  }

  router.push('/')
}
</script>
<style scoped>
.page {
  min-height: 100vh;
  background: #f7f8fc;
  padding: 40px 24px;
  box-sizing: border-box;
}

.form-card {
  max-width: 900px;
  margin: 0 auto;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 8px 30px rgba(15, 23, 42, 0.05);
}

.header {
  margin-bottom: 28px;
}

.header h1 {
  margin: 0;
  font-size: 32px;
  color: #111827;
}

.header p {
  margin-top: 8px;
  color: #6b7280;
  font-size: 15px;
}

.form {
  display: grid;
  gap: 20px;
}

.field {
  display: grid;
  gap: 8px;
}

label {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

input,
textarea,
select {
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 14px;
  padding: 14px 16px;
  font-size: 15px;
  font-family: inherit;
  box-sizing: border-box;
  transition: all 0.2s ease;
  background: white;
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.12);
}

textarea {
  resize: vertical;
  min-height: 140px;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 8px;
}

.cancel-btn {
  border: 1px solid #d1d5db;
  background: white;
  color: #374151;
  padding: 12px 18px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
}

.cancel-btn:hover {
  background: #f9fafb;
}

.save-btn {
  border: none;
  background: #111827;
  color: white;
  padding: 12px 22px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
}

.save-btn:hover {
  transform: translateY(-1px);
  background: #1f2937;
}

@media (max-width: 768px) {
  .form-card {
    padding: 20px;
  }

  .header h1 {
    font-size: 26px;
  }

  .actions {
    flex-direction: column;
  }

  .save-btn,
  .cancel-btn {
    width: 100%;
  }
}
</style>