import type { Agent, AgentRegistry as IAgentRegistry } from '@site/src/types';

/**
 * Agent Registry implementation for managing AI agent configurations
 */
export class AgentRegistry implements IAgentRegistry {
  private static instance: AgentRegistry;
  public agents: Map<string, Agent>;

  private constructor() {
    this.agents = new Map();
  }

  /**
   * Get the singleton instance of AgentRegistry
   */
  static getInstance(): AgentRegistry {
    if (!AgentRegistry.instance) {
      AgentRegistry.instance = new AgentRegistry();
    }
    return AgentRegistry.instance;
  }

  /**
   * Register a new agent
   */
  register(agent: Agent): void {
    this.validateAgent(agent);
    this.agents.set(agent.id, agent);
  }

  /**
   * Unregister an agent
   */
  unregister(agentId: string): boolean {
    return this.agents.delete(agentId);
  }

  /**
   * Get a specific agent by ID
   */
  getAgent(agentId: string): Agent | undefined {
    return this.agents.get(agentId);
  }

  /**
   * Get all registered agents
   */
  getAllAgents(): Agent[] {
    return Array.from(this.agents.values());
  }

  /**
   * Get agents by model type
   */
  getAgentsByModel(model: Agent['model']): Agent[] {
    return this.getAllAgents().filter(agent => agent.model === model);
  }

  /**
   * Get agents by tag
   */
  getAgentsByTag(tag: string): Agent[] {
    return this.getAllAgents().filter(agent => 
      agent.metadata?.tags?.includes(tag) ?? false
    );
  }

  /**
   * Search agents by query string
   */
  searchAgents(query: string): Agent[] {
    const lowerQuery = query.toLowerCase();
    return this.getAllAgents().filter(agent => {
      const searchableText = `${agent.name} ${agent.description} ${agent.metadata?.tags?.join(' ') ?? ''}`.toLowerCase();
      return searchableText.includes(lowerQuery);
    });
  }

  /**
   * Validate agent configuration
   */
  private validateAgent(agent: Agent): void {
    if (!agent.id || typeof agent.id !== 'string') {
      throw new Error('Agent must have a valid ID');
    }
    if (!agent.name || typeof agent.name !== 'string') {
      throw new Error('Agent must have a valid name');
    }
    if (!agent.description || typeof agent.description !== 'string') {
      throw new Error('Agent must have a valid description');
    }
    if (!['opus', 'sonnet', 'haiku'].includes(agent.model)) {
      throw new Error('Agent must have a valid model (opus, sonnet, or haiku)');
    }
  }

  /**
   * Clear all agents (useful for testing)
   */
  clear(): void {
    this.agents.clear();
  }

  /**
   * Load agents from configuration files
   * This is a placeholder for future implementation
   */
  async loadFromFiles(): Promise<void> {
    // TODO: Implement loading agents from .claude/agents/*.md files
    // This would involve:
    // 1. Reading all .md files from the agents directory
    // 2. Parsing the front matter and content
    // 3. Converting to Agent objects
    // 4. Registering each agent
  }
}

// Export a singleton instance
export const agentRegistry = AgentRegistry.getInstance();