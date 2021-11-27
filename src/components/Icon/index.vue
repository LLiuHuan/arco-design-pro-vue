<script>
  import { h } from 'vue';

  const Item = (props) => {
    if (props.icon) {
      return h(props.icon);
    }
  };

  Item.props = ['icon'];

  export default Item;
</script>
