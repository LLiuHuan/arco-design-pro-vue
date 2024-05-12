<template>
  <BaseScrollbarContext>
    <AButton @click="logout">退出</AButton>
    <ul>
      <li><a href="#">item 1</a></li>
      <li><a href="#">item 2</a></li>
      <li><a href="#">item 3</a></li>
      <li><a href="#">item 4</a></li>
      <li><a href="#">item 5</a></li>
      <li><a href="#">item 6</a></li>
      <li><a href="#">item 7</a></li>
      <li><a href="#">item 8</a></li>
      <li><a href="#">item 9</a></li>
      <li><a href="#">item 10</a></li>
      <li><a href="#">item 11</a></li>
      <li><a href="#">item 12</a></li>
      <li><a href="#">item 13</a></li>
      <li><a href="#">item 14</a></li>
      <li><a href="#">item 15</a></li>
      <li><a href="#">item 16</a></li>
      <li><a href="#">item 17</a></li>
      <li><a href="#">item 18</a></li>
      <li><a href="#">item 19</a></li>
      <li><a href="#">item 20</a></li>
      <li><a href="#">item 21</a></li>
      <li><a href="#">item 22</a></li>
      <li><a href="#">item 23</a></li>
      <li><a href="#">item 24</a></li>
      <li><a href="#">item 25</a></li>
      <li><a href="#">item 26</a></li>
      <li><a href="#">item 27</a></li>
      <li><a href="#">item 28</a></li>
      <li><a href="#">item 29</a></li>
      <li><a href="#">item 30</a></li>
      <li><a href="#">item 31</a></li>
      <li><a href="#">item 32</a></li>
      <li><a href="#">item 33</a></li>
      <li><a href="#">item 34</a></li>
      <li><a href="#">item 35</a></li>
      <li><a href="#">item 36</a></li>
      <li><a href="#">item 37</a></li>
      <li><a href="#">item 38</a></li>
      <li><a href="#">item 39</a></li>
      <li><a href="#">item 40</a></li>
      <li><a href="#">item 41</a></li>
      <li><a href="#">item 42</a></li>
      <li><a href="#">item 43</a></li>
      <li><a href="#">item 44</a></li>
      <li><a href="#">item 45</a></li>
      <li><a href="#">item 46</a></li>
      <li><a href="#">item 47</a></li>
      <li><a href="#">item 48</a></li>
      <li><a href="#">item 49</a></li>
      <li><a href="#">item 50</a></li>
      <li><a href="#">item 51</a></li>
      <li><a href="#">item 52</a></li>
      <li><a href="#">item 53</a></li>
      <li><a href="#">item 54</a></li>
      <li><a href="#">item 55</a></li>
      <li><a href="#">item 56</a></li>
      <li><a href="#">item 57</a></li>
      <li><a href="#">item 58</a></li>
      <li><a href="#">item 59</a></li>
      <li><a href="#">item 60</a></li>
      <li><a href="#">item 61</a></li>
      <li><a href="#">item 62</a></li>
      <li><a href="#">item 63</a></li>
      <li><a href="#">item 64</a></li>
      <li><a href="#">item 65</a></li>
      <li><a href="#">item 66</a></li>
      <li><a href="#">item 67</a></li>
      <li><a href="#">item 68</a></li>
      <li><a href="#">item 69</a></li>
      <li><a href="#">item 70</a></li>
      <li><a href="#">item 71</a></li>
      <li><a href="#">item 72</a></li>
      <li><a href="#">item 73</a></li>
      <li><a href="#">item 74</a></li>
      <li><a href="#">item 75</a></li>
      <li><a href="#">item 76</a></li>
      <li><a href="#">item 77</a></li>
      <li><a href="#">item 78</a></li>
      <li><a href="#">item 79</a></li>
      <li><a href="#">item 80</a></li>
      <li><a href="#">item 81</a></li>
      <li><a href="#">item 82</a></li>
      <li><a href="#">item 83</a></li>
      <li><a href="#">item 84</a></li>
      <li><a href="#">item 85</a></li>
      <li><a href="#">item 86</a></li>
      <li><a href="#">item 87</a></li>
      <li><a href="#">item 88</a></li>
      <li><a href="#">item 89</a></li>
      <li><a href="#">item 90</a></li>
      <li><a href="#">item 91</a></li>
      <li><a href="#">item 92</a></li>
      <li><a href="#">item 93</a></li>
      <li><a href="#">item 94</a></li>
      <li><a href="#">item 95</a></li>
      <li><a href="#">item 96</a></li>
      <li><a href="#">item 97</a></li>
      <li><a href="#">item 98</a></li>
      <li><a href="#">item 99</a></li>
      <li><a href="#">item 100</a></li>
    </ul>
  </BaseScrollbarContext>
</template>

<script lang="ts" setup>
  // import { useAuthStore } from '@/store/modules/auth';
  // import { useRoute, useRouter } from 'vue-router';

  import { useAuth } from '@/hooks/web/useAuth';
  import { BaseScrollbarContext } from '@/components/BaseScrollbarContent';

  const { logout } = useAuth();
  // const route = useRoute();
  // const router = useRouter();

  console.log('1111222');
</script>

<style lang="less" scoped></style>
