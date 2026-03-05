import axios from 'axios';
import { config } from '../config/env.js';
import { AIGeneration } from '../models/index.js';
import logger from '../utils/logger.js';

class AIService {
  constructor() {
    this.fastApiClient = axios.create({
      baseURL: config.fastApiUrl,
      timeout: 60000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  /**
   * Log AI generation to database
   */
  async logAIGeneration(data) {
    try {
      await AIGeneration.create(data);
    } catch (error) {
      logger.error('Failed to log AI generation:', error);
    }
  }

  /**
   * Generate script from text
   */
  async generateScript(text, projectId, videoId) {
    const startTime = Date.now();
    
    try {
      logger.info('Generating script from text');

      const response = await this.fastApiClient.post('/generate-script', {
        text,
        model: 'gpt-4'
      });

      const latency = Date.now() - startTime;

      // Log AI generation
      await this.logAIGeneration({
        projectId,
        videoId,
        agentType: 'script-agent',
        inputData: { text },
        outputData: response.data,
        modelUsed: 'gpt-4',
        tokensUsed: response.data.tokensUsed || 0,
        latencyMs: latency,
        status: 'success'
      });

      return response.data;
    } catch (error) {
      const latency = Date.now() - startTime;

      // Log failed generation
      await this.logAIGeneration({
        projectId,
        videoId,
        agentType: 'script-agent',
        inputData: { text },
        outputData: null,
        modelUsed: 'gpt-4',
        tokensUsed: 0,
        latencyMs: latency,
        status: 'failed',
        errorMessage: error.message
      });

      logger.error('Generate script error:', error);
      throw new Error('Failed to generate script');
    }
  }

  /**
   * Generate scenes from script
   */
  async generateScenes(script, projectId, videoId) {
    const startTime = Date.now();
    
    try {
      logger.info('Generating scenes from script');

      const response = await this.fastApiClient.post('/generate-scenes', {
        script,
        model: 'gpt-4'
      });

      const latency = Date.now() - startTime;

      await this.logAIGeneration({
        projectId,
        videoId,
        agentType: 'visual-agent',
        inputData: { script },
        outputData: response.data,
        modelUsed: 'gpt-4',
        tokensUsed: response.data.tokensUsed || 0,
        latencyMs: latency,
        status: 'success'
      });

      return response.data;
    } catch (error) {
      const latency = Date.now() - startTime;

      await this.logAIGeneration({
        projectId,
        videoId,
        agentType: 'visual-agent',
        inputData: { script },
        outputData: null,
        modelUsed: 'gpt-4',
        tokensUsed: 0,
        latencyMs: latency,
        status: 'failed',
        errorMessage: error.message
      });

      logger.error('Generate scenes error:', error);
      throw new Error('Failed to generate scenes');
    }
  }

  /**
   * Generate voiceover for scene
   */
  async generateVoice(sceneText, projectId, videoId) {
    const startTime = Date.now();
    
    try {
      logger.info('Generating voiceover');

      const response = await this.fastApiClient.post('/generate-voice', {
        text: sceneText,
        voice: 'default'
      });

      const latency = Date.now() - startTime;

      await this.logAIGeneration({
        projectId,
        videoId,
        agentType: 'voice-agent',
        inputData: { text: sceneText },
        outputData: response.data,
        modelUsed: 'elevenlabs',
        tokensUsed: 0,
        latencyMs: latency,
        status: 'success'
      });

      return response.data;
    } catch (error) {
      const latency = Date.now() - startTime;

      await this.logAIGeneration({
        projectId,
        videoId,
        agentType: 'voice-agent',
        inputData: { text: sceneText },
        outputData: null,
        modelUsed: 'elevenlabs',
        tokensUsed: 0,
        latencyMs: latency,
        status: 'failed',
        errorMessage: error.message
      });

      logger.error('Generate voice error:', error);
      throw new Error('Failed to generate voiceover');
    }
  }

  /**
   * Fact check content
   */
  async factCheck(content, projectId, videoId) {
    const startTime = Date.now();
    
    try {
      logger.info('Fact checking content');

      const response = await this.fastApiClient.post('/fact-check', {
        content
      });

      const latency = Date.now() - startTime;

      await this.logAIGeneration({
        projectId,
        videoId,
        agentType: 'factcheck-agent',
        inputData: { content },
        outputData: response.data,
        modelUsed: 'gpt-4',
        tokensUsed: response.data.tokensUsed || 0,
        latencyMs: latency,
        status: 'success'
      });

      return response.data;
    } catch (error) {
      const latency = Date.now() - startTime;

      await this.logAIGeneration({
        projectId,
        videoId,
        agentType: 'factcheck-agent',
        inputData: { content },
        outputData: null,
        modelUsed: 'gpt-4',
        tokensUsed: 0,
        latencyMs: latency,
        status: 'failed',
        errorMessage: error.message
      });

      logger.error('Fact check error:', error);
      throw new Error('Failed to fact check content');
    }
  }
}

export default new AIService();
