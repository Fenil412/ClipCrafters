import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';
import { config } from '../config/env.js';
import logger from '../utils/logger.js';

class AuthService {
  /**
   * Generate JWT token
   */
  generateJWT(userId) {
    return jwt.sign({ id: userId }, config.jwtSecret, {
      expiresIn: config.jwtExpiresIn
    });
  }

  /**
   * Register new user
   */
  async registerUser(userData) {
    try {
      const { name, email, password, role } = userData;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('User already exists with this email');
      }

      // Create user
      const user = await User.create({
        name,
        email,
        password,
        role: role || 'user'
      });

      // Generate token
      const token = this.generateJWT(user._id);

      logger.info(`User registered: ${email}`);

      return {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        token
      };
    } catch (error) {
      logger.error('Registration error:', error);
      throw error;
    }
  }

  /**
   * Login user
   */
  async loginUser(email, password) {
    try {
      // Find user with password field
      const user = await User.findOne({ email }).select('+password');

      if (!user) {
        throw new Error('Invalid credentials');
      }

      // Compare password
      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        throw new Error('Invalid credentials');
      }

      // Generate token
      const token = this.generateJWT(user._id);

      logger.info(`User logged in: ${email}`);

      return {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar
        },
        token
      };
    } catch (error) {
      logger.error('Login error:', error);
      throw error;
    }
  }

  /**
   * Get user profile
   */
  async getUserProfile(userId) {
    try {
      const user = await User.findById(userId)
        .populate('projects', 'title status createdAt');

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    } catch (error) {
      logger.error('Get profile error:', error);
      throw error;
    }
  }
}

export default new AuthService();
