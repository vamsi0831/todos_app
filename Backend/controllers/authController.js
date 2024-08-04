const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/todo.model');
const { createClient } = require('@supabase/supabase-js');

// const supabaseUrl = process.env.SUPABASE_URL;
const supabaseUrl = "https://yutsixzmhbafwfiwgkpz.supabase.co"
// const supabaseKey = process.env.SUPABASE_KEY;
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1dHNpeHptaGJhZndmaXdna3B6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI2MzMxNjQsImV4cCI6MjAzODIwOTE2NH0.xZZiImd6VyOns-PLgzhLsJM4C8U1Hmz0y9qelhCybr0"

console.log('Supabase URL:', process.env.SUPABASE_URL)
console.log('Supabase KEY:', process.env.SUPABASE_KEY)


const supabase = createClient(supabaseUrl, supabaseKey);



exports.registerUser = async (req, res) => {
  const {  email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
