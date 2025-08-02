import { agentRegistry } from './agentRegistry';
import type { Agent } from '@site/src/types';

/**
 * Example usage of the AgentRegistry
 */

// Example agent configurations
const exampleAgents: Agent[] = [
  {
    id: 'code-optimizer',
    name: 'Code Optimizer',
    description: 'Analyzes code performance and suggests optimizations',
    model: 'opus',
    capabilities: [
      {
        category: 'Performance',
        items: ['Algorithm optimization', 'Memory management', 'Time complexity analysis']
      },
      {
        category: 'Refactoring',
        items: ['Code structure improvement', 'Design pattern implementation']
      }
    ],
    metadata: {
      tags: ['optimization', 'performance', 'code-quality'],
      version: '1.0.0'
    }
  },
  {
    id: 'security-architect',
    name: 'Security Architect',
    description: 'Provides security guidance and vulnerability analysis',
    model: 'opus',
    capabilities: [
      {
        category: 'Security Analysis',
        items: ['Vulnerability assessment', 'Security best practices', 'Threat modeling']
      }
    ],
    metadata: {
      tags: ['security', 'authentication', 'compliance'],
      version: '1.0.0'
    }
  }
];

// Register agents
exampleAgents.forEach(agent => {
  agentRegistry.register(agent);
});

// Usage examples
export function demonstrateAgentRegistry(): void {
  // Get all agents
  const allAgents = agentRegistry.getAllAgents();
  console.log('Total agents:', allAgents.length);

  // Get agent by ID
  const codeOptimizer = agentRegistry.getAgent('code-optimizer');
  console.log('Code Optimizer:', codeOptimizer?.name);

  // Get agents by model
  const opusAgents = agentRegistry.getAgentsByModel('opus');
  console.log('Opus agents:', opusAgents.length);

  // Search agents
  const securityAgents = agentRegistry.searchAgents('security');
  console.log('Security-related agents:', securityAgents.length);

  // Get agents by tag
  const performanceAgents = agentRegistry.getAgentsByTag('performance');
  console.log('Performance-tagged agents:', performanceAgents.length);
}