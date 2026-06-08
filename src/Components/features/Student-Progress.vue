<template>
  <aside class="sidebar" v-if="!isTeacher">
    <section v-if="!isTeacher" class="summary-card">
      <p class="summary-label">Total Problems Solved</p>
      <div class="summary-circle">
        <span>{{ solvedCount }}</span>
        <small>/ {{ totalCount }}</small>
      </div>
    </section>
    <section class="friends-card">
      <div class="card-head">
        <div>
          <p class="summary-label">Friends Leaderboard</p>
          <h2>See where your friends at !</h2>
        </div>
        <span class="leaderboard-badge">Live</span>
      </div>

      <div class="friend-list">
        <div v-for="friend in friends" :key="friend.id" class="friend-row">
          <div class="friend-rank" :class="friend.rankClass.toLowerCase()">
            <Gem
              v-if="friend.tier === 'Diamond'"
              :size="18"
              class="diamond-icon"
            />

            <Crown
              v-else-if="friend.tier === 'Gold'"
              :size="18"
              class="gold-icon"
            />

            <Medal v-else :size="18" class="silver-icon" />
          </div>
          <div class="friend-meta">
            <p class="friend-name">{{ friend.name }}</p>
            <p class="friend-score">
              {{ friend.solved }}/{{ totalCount }} solved
            </p>
          </div>
          <div class="friend-tier" :class="friend.tier.toLowerCase()">
            {{ friend.tier }}
          </div>
        </div>
      </div>

      <button class="invite-btn" type="button">
        <span class="invite-icon">＋</span>
        Invite Friend
      </button>
    </section>
  </aside>
</template>
<script setup>
import { computed } from "vue";
import { Gem, Crown, Medal } from "lucide-vue-next";

const props = defineProps({
  isTeacher: {
    type: Boolean,
    default: false,
  },
  sections: {
    type: Array,
    required: true,
  },
  friends: {
    type: Array,
    required: true,
  },
  totalCount: {
    type: Number,
    required: true,
  },
});

const totalCount = computed(() =>
  props.sections.reduce((sum, section) => sum + section.items.length, 0),
);

const solvedCount = computed(() =>
  props.sections.reduce(
    (sum, section) => sum + section.items.filter((item) => item.solved).length,
    0,
  ),
);

const friends = [
  {
    id: 1,
    name: "Ava",
    solved: 18,
    tier: "Diamond",
    rankClass: "rank-diamond",
    tierClass: "tier-diamond",
  },
  {
    id: 2,
    name: "Noah",
    solved: 15,
    tier: "Gold",
    rankClass: "rank-gold",
    tierClass: "tier-gold",
  },
  {
    id: 3,
    name: "Mia",
    solved: 12,
    tier: "Silver",
    rankClass: "rank-silver",
    tierClass: "tier-silver",
  },
];
</script>

<style scoped>
.summary-card,
.friends-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(15, 23, 42, 0.05);
  padding: 24px;
}

.summary-label {
  margin: 0 0 16px;
  font-size: 14px;
  color: #6b7280;
  text-align: center;
}

.summary-circle {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 10px solid #d1fae5;
  display: grid;
  place-items: center;
  margin: 0 auto 16px;
  text-align: center;
}

.summary-circle span {
  display: block;
  font-size: 42px;
  font-weight: 800;
  line-height: 1;
}

.summary-circle small {
  font-size: 18px;
  color: #6b7280;
}

.friends-card {
  margin-top: 24px;
}

.card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
}

.leaderboard-badge {
  background: #eff6ff;
  color: #2563eb;
  padding: 8px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
}

.friend-list {
  display: grid;
  gap: 14px;
}

.friend-row {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 14px;
  align-items: center;
  padding: 14px;
  border: 1px solid #eef2f7;
  border-radius: 16px;
  background: #fcfcfd;
}

.friend-rank {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 18px;
  font-weight: 700;
}

.rank-gold {
  background: #e0ba24;
  color: #92400e;
}

.rank-silver {
  background: #909294;
  color: #f1f4f8;
}

.rank-diamond {
  background: #eeedeb;
  color: #854d0e;
}

.friend-meta {
  min-width: 0;
}

.friend-name {
  margin: 0 0 4px;
  font-weight: 700;
}

.friend-score {
  margin: 0;
  font-size: 13px;
  color: #6b7280;
}

.friend-tier {
  padding: 8px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
}

.tier-gold {
  background: #fef3c7;
  color: #92400e;
}

.tier-silver {
  background: #e2e8f0;
  color: #334155;
}

.tier-bronze {
  background: #fde68a;
  color: #854d0e;
}

.invite-btn {
  width: 100%;
  margin-top: 16px;
  border: 0;
  border-radius: 14px;
  background: #2563eb;
  color: white;
  padding: 14px 18px;
  font-weight: 700;
  cursor: pointer;
}
</style>
