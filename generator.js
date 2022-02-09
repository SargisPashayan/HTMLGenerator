const template = {
  docPrint: function() {
    return {
      tag: 'div',
      id: 5,
      classes: ['main-tag'],
      properties: {
        title: "document",
        tabIndex: 0
      },
      children: [
        {
          tag: 'div',
          classes: ['main-tag-header'],
          children: [
            { tag: 'h2', content: "test" }
          ]
        },
        {
          tag: 'p',
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
        },
        {
          tag: 'div',
          id: 'docControls',
          classes: ['buttons'],
          children: [
            {
              tag: 'input',
              classes: ['input-form']
            },
            {
              tag: 'button',
              classes: ['btn-tag'],
              id: 'moveDoc',
              content: 'delete',
              children: [
                {
                  tag: 'i',
                  classes: ['fa', 'fa-folder']
                }
              ]
            },
            {
              tag: 'button',
              classes: ['btn-tag'],
              id: 'deleteDoc',
              content: 'edit',
              children: [
                {
                  tag: 'i',
                  classes: ['fa', 'fa-trash']
                }
              ]
            }
          ]
        }
      ]
  }
}
}


class HTMLGenerator {
    constructor(object) {
      Object.assign(this, object);
      let childObjects = [];
      if (object.children){
        for (const child of object.children) {
          let childObject = new HTMLGenerator(child);
          childObjects.push(childObject);
        }
      }
      this.children = childObjects;
      this.element = this.createdElement;
      document.body.appendChild(this.element);
    }
    get createdElement() {
      const createdElement = document.createElement(this.tag);
      if (this.id) createdElement.id = this.id;
      if (this.content) createdElement.innerText = this.content;
      if (this.properties) {
        for (const prop in this.properties) {
          createdElement[prop] = this.properties[prop];
        }
      }
      if (this.classes) {
        for (const cssClass of this.classes) {
          createdElement.classList.add(cssClass);
        }
      }
      if (this.children) {
        for (const child of this.children) {
          createdElement.append(child.createdElement);
          if (child.id) this[child.id] = child.createdElement;
        }
      }
    
      return createdElement
    }
    
}

  var instance = new HTMLGenerator(template.docPrint());
  console.log(instance);