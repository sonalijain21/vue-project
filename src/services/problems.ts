import { supabase } from '@/lib/supabase'

export async function fetchProblems() {
  const { data, error } = await supabase
    .from('problems')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function addProblem(problem: {
  title: string
  statement: string
  difficulty?: string
  topic?: string
}) {
  const { data, error } = await supabase
    .from('problems')
    .insert(problem)
    .select()

  if (error) throw error
  return data
}

export async function updateProblem(id: string, updates: any) {
  const { data, error } = await supabase
    .from('problems')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()

  if (error) throw error
  return data
}