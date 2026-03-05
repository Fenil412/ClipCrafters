/**
 * Quick API test script
 * Run: node test-api.js
 */

const testEndpoints = async () => {
  const baseUrl = 'http://localhost:5000';
  
  console.log('🧪 Testing API Endpoints...\n');

  try {
    // Test 1: Health Check
    console.log('1️⃣ Testing Health Endpoint...');
    const healthRes = await fetch(`${baseUrl}/health`);
    const healthData = await healthRes.json();
    console.log('✅ Health:', healthData.message);
    console.log('   Status:', healthRes.status, '\n');

    // Test 2: API Root
    console.log('2️⃣ Testing API Root...');
    const apiRes = await fetch(`${baseUrl}/api`);
    const apiData = await apiRes.json();
    console.log('✅ API Version:', apiData.version);
    console.log('   Endpoints:', Object.keys(apiData.endpoints).join(', '), '\n');

    // Test 3: Register User
    console.log('3️⃣ Testing User Registration...');
    const registerRes = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: `test${Date.now()}@example.com`,
        password: 'password123'
      })
    });
    const registerData = await registerRes.json();
    
    if (registerData.success) {
      console.log('✅ Registration successful');
      console.log('   User:', registerData.data.user.name);
      console.log('   Token:', registerData.data.token.substring(0, 20) + '...\n');
      
      const token = registerData.data.token;

      // Test 4: Get Profile
      console.log('4️⃣ Testing Get Profile...');
      const profileRes = await fetch(`${baseUrl}/api/auth/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const profileData = await profileRes.json();
      console.log('✅ Profile retrieved:', profileData.data.name, '\n');

      // Test 5: Create Project
      console.log('5️⃣ Testing Create Project...');
      const projectRes = await fetch(`${baseUrl}/api/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: 'Test Project',
          description: 'Testing project creation',
          sourceType: 'text'
        })
      });
      const projectData = await projectRes.json();
      console.log('✅ Project created:', projectData.data.title, '\n');

      // Test 6: Get Projects
      console.log('6️⃣ Testing Get Projects...');
      const projectsRes = await fetch(`${baseUrl}/api/projects`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const projectsData = await projectsRes.json();
      console.log('✅ Projects retrieved:', projectsData.data.length, 'project(s)\n');

      console.log('🎉 All tests passed!\n');
    } else {
      console.log('❌ Registration failed:', registerData.message);
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n⚠️  Make sure the server is running: npm run dev');
  }
};

testEndpoints();
