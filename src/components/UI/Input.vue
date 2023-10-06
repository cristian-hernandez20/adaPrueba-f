<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="input-container py-1">
    <v-text-field
      dense
      :id="field.id"
      :rules="rules"
      color="primary"
      validate-on="blur"
      @blur="skipFoco"
      autocomplete="nope"
      :value="modelValue"
      hide-details="auto"
      @input="updateValue"
      :label="field.label"
      :counter="field.counter"
      :maxlength="field.maxlength"
      @click:prepend="clickPrepend"
      @keydown.enter="validateCampo"
      :prepend-icon="field.prependIcon"
      :disabled="field.disabled || false"
      @click:append-inner="visible = !visible"
      :readonly="field.readonly || false"
      :clearable="field.clearable || false"
      :variant="field.variant || 'outlined'"
      :density="field.density || 'compact'"
      :prepend-inner-icon="field.prependInnerIcon"
      :type="
        field.id == 'password' ? (visible ? 'text' : 'password') : field.tipo
      "
      :append-inner-icon="
        field.id == 'password' ? (visible ? 'mdi-eye-off' : 'mdi-eye') : ''
      "
      oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: String,
    field: {
      id: String,
      tipo: String,
      rules: Array,
      label: String,
      variant: String,
      density: String,
      counter: String,
      disabled: Boolean,
      readonly: Boolean,
      maxlength: String,
      clearable: Boolean,
      placeholder: String,
      prependIcon: String,
      prependInnerIcon: String,
    },
  },
  emits: ["update:modelValue", "validate", "blur"],
  data() {
    return {
      visible: false,
      valor: "",
      rules: [],
    };
  },
  watch: {},
  mounted() {
    setTimeout(() => {
      this.dynamicRules();
    }, 300);
  },
  methods: {
    dynamicRules() {},
    skipFoco() {
      this.$emit("blur");
    },
    validateCampo() {
      this.$emit("validate");
    },
    updateValue(e) {
      let valor = e.target.value;
      this.$emit("update:modelValue", valor);
    },
    clickPrepend() {},
    appendII() {
      this.$emit("AII");
    },
  },
};
</script>
