<template>
  <div class="playground-wrap">
    <section class="editor-card">
      <div class="editor-card-header">
        <h2>SQL Playground</h2>
        <span class="language">SQL</span>
      </div>

      <div class="editor-shell">
        <div class="editor-toolbar">
          <span class="dot red"></span>
          <span class="dot yellow"></span>
          <span class="dot green"></span>
        </div>

        <div class="editor-container">
          <MonacoEditor
            v-model:value="query"
            language="sql"
            theme="vs-light"
            :options="editorOptions"
          />
        </div>

        <div class="editor-footer">
          <button
            class="run-btn"
            type="button"
            @click="runQuery"
            :disabled="!dbReady"
          >
            {{ dbReady ? "Run Query" : "Loading DB..." }}
          </button>
          <span class="hint">Monaco editor + browser SQL execution</span>
        </div>
      </div>
    </section>

    <section class="results-card">
      <div class="results-head">
        <h2>Results</h2>
        <span class="results-status">{{ status }}</span>
      </div>

      <div v-if="errorMessage" class="error-box">
        {{ errorMessage }}
      </div>

      <div v-else-if="!lastRunQuery" class="results-placeholder">
        <p>No query executed yet.</p>
        <span>Output will appear here after running SQL.</span>
      </div>

      <div v-else class="results-output">
        <p><strong>Last Query:</strong></p>
        <pre>{{ lastRunQuery }}</pre>

        <div v-if="resultColumns.length" class="table-wrap">
          <table class="result-table">
            <thead>
              <tr>
                <th v-for="col in resultColumns" :key="col">{{ col }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, rowIndex) in resultRows" :key="rowIndex">
                <td v-for="(col, colIndex) in resultColumns" :key="colIndex">
                  {{ row[col] ?? "NULL" }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p v-else class="note">Query executed, but no rows were returned.</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import MonacoEditor from "@guolao/vue-monaco-editor";
import initSqlJs from "sql.js";

const query = ref(`SELECT *\nFROM Employee;`);
const lastRunQuery = ref("");
const status = ref("Waiting");
const errorMessage = ref("");
const dbReady = ref(false);

const resultColumns = ref([]);
const resultRows = ref([]);
let db = null;

const editorOptions = {
  automaticLayout: true,
  minimap: {
    enabled: false
  },
  fontSize: 15,
  scrollBeyondLastLine: false,
  wordWrap: 'on',
  lineNumbers: 'on'
}
onMounted(async () => {
  try {
    const SQL = await initSqlJs({
      locateFile: (file) =>
        `${location.origin}${import.meta.env.BASE_URL}sql-wasm.wasm`,
    });

    db = new SQL.Database();
    seedDatabase(db);
    dbReady.value = true;
    status.value = "Ready";
  } catch (err) {
    errorMessage.value = `Failed to initialize SQL engine: ${err?.message || err}`;
    status.value = "Error";
  }
});

function seedDatabase(database) {
  database.run(`
    CREATE TABLE Employee (
      id INTEGER,
      name TEXT,
      salary INTEGER,
      managerId INTEGER
    );

    INSERT INTO Employee (id, name, salary, managerId) VALUES
      (1, 'Joe', 70000, 3),
      (2, 'Henry', 80000, 4),
      (3, 'Sam', 60000, NULL),
      (4, 'Max', 90000, NULL);
  `);
}

function runQuery() {
  errorMessage.value = "";
  lastRunQuery.value = query.value.trim();
  resultColumns.value = [];
  resultRows.value = [];

  if (!dbReady.value || !db || !lastRunQuery.value) {
    status.value = "Empty query";
    return;
  }

  try {
    const result = db.exec(lastRunQuery.value);

    if (!result.length) {
      status.value = "Executed";
      return;
    }

    const firstResult = result[0];
    resultColumns.value = firstResult.columns;
    resultRows.value = firstResult.values.map((row) => {
      const rowObj = {};
      firstResult.columns.forEach((col, index) => {
        rowObj[col] = row[index];
      });
      return rowObj;
    });

    status.value = "Success";
  } catch (err) {
    status.value = "Error";
    errorMessage.value = err?.message || "SQL execution failed";
  }
}
</script>

<style scoped>
.playground-wrap {
  display: grid;
  gap: 22px;
}

.editor-card,
.results-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 22px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.05);
  padding: 22px;
}

.editor-card-header,
.results-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.editor-card-header h2,
.results-head h2 {
  margin: 0;
  font-size: 24px;
}

.language,
.results-status {
  display: inline-flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
}

.language {
  background: #eff6ff;
  color: #2563eb;
}

.results-status {
  background: #f3f4f6;
  color: #6b7280;
}

.editor-shell {
  border: 1px solid #dbe2ea;
  border-radius: 20px;
  background: linear-gradient(180deg, #ffffff 0%, #fafbff 100%);
  overflow: hidden;
}

.editor-toolbar {
  display: flex;
  gap: 8px;
  padding: 14px 16px;
  border-bottom: 1px solid #eef2f7;
  background: rgba(248, 250, 252, 0.9);
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.dot.red {
  background: #ef4444;
}

.dot.yellow {
  background: #f59e0b;
}

.dot.green {
  background: #22c55e;
}

.monaco {
  height: 320px;
}

.editor-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 16px 18px 18px;
  border-top: 1px solid #eef2f7;
}
.editor-container {
  height: 400px;
  width: 100%;
}
.run-btn {
  padding: 14px 26px;
  border: none;
  border-radius: 999px;
  background: linear-gradient(135deg, #111827 0%, #374151 100%);
  color: white;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 10px 22px rgba(17, 24, 39, 0.18);
}

.run-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.run-btn:hover:not(:disabled) {
  transform: translateY(-1px);
}

.hint {
  font-size: 13px;
  color: #6b7280;
}

.results-placeholder {
  min-height: 140px;
  display: grid;
  place-items: center;
  text-align: center;
  gap: 6px;
  border: 1px dashed #dbe2ea;
  border-radius: 18px;
  background: #fcfcfe;
  color: #475569;
}

.results-placeholder p,
.results-output p {
  margin: 0;
}

.results-placeholder p {
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
}

.results-placeholder span,
.note {
  font-size: 13px;
  color: #6b7280;
}

.error-box {
  padding: 14px 16px;
  border-radius: 14px;
  background: #fef2f2;
  color: #b91c1c;
  border: 1px solid #fecaca;
  margin-bottom: 12px;
}

.results-output {
  padding: 18px;
  border: 1px solid #e5e7eb;
  border-radius: 18px;
  background: #fcfcfe;
}

.results-output pre {
  margin: 10px 0 18px;
  padding: 14px;
  border-radius: 14px;
  background: #111827;
  color: #e5e7eb;
  overflow-x: auto;
}

.table-wrap {
  overflow-x: auto;
}

.result-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #e5e7eb;
  background: white;
}

.result-table th,
.result-table td {
  padding: 10px 12px;
  border-bottom: 1px solid #e5e7eb;
  text-align: left;
}

.result-table th {
  background: #f9fafb;
  font-weight: 700;
}

</style>
