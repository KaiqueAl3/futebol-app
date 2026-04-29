import {
  FALLBACK_LEAGUES, FALLBACK_TEAMS, FALLBACK_PLAYERS,
  findFallbackLeague, findFallbackTeam, findFallbackPlayer,
  findFallbackTeamsByLeagueName, searchFallbackTeams, searchFallbackPlayers,
} from '../data/fallback'

const API_KEYS = ['123', '3']
const BASE = (key) => `https://www.thesportsdb.com/api/v1/json/${key}`
const CORS_PROXIES = [
  (u) => `https://corsproxy.io/?${encodeURIComponent(u)}`,
  (u) => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`,
  (u) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(u)}`,
]

async function fetchJson(url) {
  const res = await fetch(url, { method: 'GET', headers: { Accept: 'application/json' } })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const text = await res.text()
  if (!text || text.trim() === '') return {}
  return JSON.parse(text)
}

async function tsdbGet(path) {
  for (const key of API_KEYS) {
    try { return await fetchJson(`${BASE(key)}${path}`) } catch {}
  }
  for (const proxy of CORS_PROXIES) {
    for (const key of API_KEYS) {
      try { return await fetchJson(proxy(`${BASE(key)}${path}`)) } catch {}
    }
  }
  throw new Error(`Falha em ${path}`)
}

export const getSoccerLeagues = async () => {
  try {
    const data = await tsdbGet('/all_leagues.php')
    const list = (data?.leagues || []).filter((l) => l.strSport === 'Soccer')
    if (list.length > 0) {
      const ids = new Set(list.map((l) => l.idLeague))
      const merged = [...list, ...FALLBACK_LEAGUES.filter((l) => !ids.has(l.idLeague))]
      return merged.sort((a, b) => (a.strLeague || '').localeCompare(b.strLeague || ''))
    }
    return FALLBACK_LEAGUES
  } catch (err) {
    console.warn('[API] getSoccerLeagues → fallback:', err.message)
    return FALLBACK_LEAGUES
  }
}

export const getLeagueById = async (id) => {
  try {
    const data = await tsdbGet(`/lookupleague.php?id=${id}`)
    if (data?.leagues?.[0]) return data.leagues[0]
  } catch (err) { console.warn('[API] getLeagueById:', err.message) }
  return findFallbackLeague(id) || null
}

export const getTeamsByLeague = async (leagueName) => {
  try {
    const data = await tsdbGet(`/search_all_teams.php?l=${encodeURIComponent(leagueName)}`)
    if (data?.teams && data.teams.length > 0) return data.teams
  } catch (err) { console.warn('[API] getTeamsByLeague:', err.message) }
  return findFallbackTeamsByLeagueName(leagueName)
}

export const getTeamById = async (id) => {
  try {
    const data = await tsdbGet(`/lookupteam.php?id=${id}`)
    if (data?.teams?.[0]) return data.teams[0]
  } catch (err) { console.warn('[API] getTeamById:', err.message) }
  return findFallbackTeam(id) || null
}

export const searchTeams = async (query) => {
  let results = []
  try {
    const data = await tsdbGet(`/searchteams.php?t=${encodeURIComponent(query)}`)
    results = data?.teams || []
  } catch (err) { console.warn('[API] searchTeams:', err.message) }
  const ids = new Set(results.map((t) => t.idTeam))
  const local = searchFallbackTeams(query).filter((t) => !ids.has(t.idTeam))
  return [...results, ...local]
}

export const getNextEventsByTeam = async (teamId) => {
  try { const data = await tsdbGet(`/eventsnext.php?id=${teamId}`); return data?.events || [] }
  catch { return [] }
}

export const getLastEventsByTeam = async (teamId) => {
  try { const data = await tsdbGet(`/eventslast.php?id=${teamId}`); return data?.results || [] }
  catch { return [] }
}

export const searchPlayers = async (query) => {
  let results = []
  try {
    const data = await tsdbGet(`/searchplayers.php?p=${encodeURIComponent(query)}`)
    results = data?.player || []
  } catch (err) { console.warn('[API] searchPlayers:', err.message) }
  const ids = new Set(results.map((p) => p.idPlayer))
  const local = searchFallbackPlayers(query).filter((p) => !ids.has(p.idPlayer))
  return [...results, ...local]
}

export const getPlayerById = async (id) => {
  try {
    const data = await tsdbGet(`/lookupplayer.php?id=${id}`)
    if (data?.players?.[0]) return data.players[0]
  } catch (err) { console.warn('[API] getPlayerById:', err.message) }
  return findFallbackPlayer(id) || null
}

export const _fallback = { leagues: FALLBACK_LEAGUES, teams: FALLBACK_TEAMS, players: FALLBACK_PLAYERS }
