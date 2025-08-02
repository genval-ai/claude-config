/**
 * Type definitions for AI Agent configurations
 */

export interface AgentExample {
  context: string;
  user: string;
  assistant: string;
  commentary: string;
}

export interface AgentCapability {
  category: string;
  items: string[];
}

export interface AgentMetadata {
  author?: string;
  lastUpdated?: string;
  tags?: string[];
  version?: string;
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  model: 'opus' | 'sonnet' | 'haiku';
  capabilities?: AgentCapability[];
  examples?: AgentExample[];
  metadata?: AgentMetadata;
}

export interface AgentConfig {
  name: string;
  description: string;
  model: string;
  examples?: AgentExample[];
  tools?: string[];
}

export interface AgentRegistry {
  agents: Map<string, Agent>;
  register(agent: Agent): void;
  unregister(agentId: string): boolean;
  getAgent(agentId: string): Agent | undefined;
  getAllAgents(): Agent[];
  getAgentsByModel(model: Agent['model']): Agent[];
  getAgentsByTag(tag: string): Agent[];
  searchAgents(query: string): Agent[];
}