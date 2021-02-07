
export interface AgentActions {
  start: string
  stop: string
}

export const AGENT_ACTIONS = (agentName: string): AgentActions => ({
  start: `${ agentName }_start`,
  stop: `${ agentName }_stop`
})
