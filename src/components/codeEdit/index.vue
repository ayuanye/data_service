<template>
  <div>
    <editor
      :value="content"
      @input="handleInput"
      @init="editorInit"
      :theme="aceConfig.selectTheme"
      :lang="aceConfig.selectLang"
      :options="aceConfig.options"
      width="100%"
      height="200px"
    />
  </div>
</template>
    
<script>
const themes = ["xcode", "eclipse", "monokai", "cobalt"];
const langs = ["java", "c_cpp", "javascript", "golang"];
const tabs = [2, 4, 8];
const fontSizes = [14, 15, 16, 17, 18, 19, 20, 21, 22];
const options = {
  tabSize: 4,
  showPrintMargin: true,
  fontSize: 15,
  highlightActiveLine: true,
  enableBasicAutocompletion: true,
  enableSnippets: true,
  enableLiveAutocompletion: true,
};
export default {
  name: "CodeEdit",
  components: {
    editor: require("vue2-ace-editor"),
  },
  data() {
    return {
      aceConfig: {
        langs,
        themes,
        tabs,
        fontSizes,
        options,
        selectTheme: "xcode",
        selectLang: "java",
        readOnly: false,
      },
    };
  },
  model: {
    prop: "content",
    event: "change",
  },
  props: {
    content: String,
  },
  methods: {
    handleInput(e) {
      this.$emit("change", e);
    },
    editorInit() {
      require("brace/ext/language_tools"); // language extension prerequsite...
      require(`brace/mode/${this.aceConfig.selectLang}`);
      require(`brace/theme/${this.aceConfig.selectTheme}`);
    },
  },
};
</script>

