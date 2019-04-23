<template>
  <b-card>
    <div slot="header" class="d-flex justify-content-between">
      <strong>Детальная информация</strong>
      <b-button class="category" variant="outline-danger" @click="close()">X</b-button>
    </div>

    <table class="table">
      <tbody>
        <tr>
          <th scope="row">Название</th>
          <td><input class="form-control" v-model="product.name"></td>
        </tr>
        <tr>
          <th scope="row">Категория</th>
          <td>
            <span v-if="!showCategoriesList" class="pointer" @click="showCategoriesList = true">{{ category.name }}</span>
            <CategoriesToSelect v-else :categories="parentCategories" @setCategory="setCategory($event)" />
          </td>
        </tr>
        <tr>
          <th scope="row">Фото</th>
            <td>
              <!--
                Чтобы механизм загрузки работал корректно, файлы должны загружаться через input[type=file]
                Чтобы не стилизовать его, решено обернуть все в общий label, скрыть input, а вместо него посавить div,
                замаскированный под кнопку (button не работает на label)
               -->
              <label class="product__photo--label" for="photo__input">
                <template>
                  <Photo 
                    class="details__photo" 
                    v-if="product.img" 
                    :product="product" 
                    :refresh="refreshPhoto"
                  ></Photo>
                  <div v-else class="btn btn-primary" variant="outline-success">Добавить фото</div>    
                </template>
                <input id="photo__input" class="photo__input" type="file" @input="addImage($event)">
              </label>
              <span class="details__status">{{ uploadStatus }}</span>                
            </td>
        </tr>
        <tr>
          <th scope="row">Иконка</th>
          <td>
            <Icons 
              :iconId="product.icon_id"
              :categoryId="product.category"
              :color="product.color"
              @setIcon="setIcon($event)"
            />
          </td>
        </tr>
        <tr>
          <th scope="row">Цвет</th>
          <td>
            <Palette @setColor="setColor($event)"/>
          </td>
        </tr>
        <tr>
          <th scope="row">Стоимость</th>
          <td><input class="form-control" v-model="product.cost"></td>
        </tr>
        <tr>
          <th scope="row">Описание</th>
          <td><textarea class="form-control" v-model="product.note"></textarea></td>
        </tr>
        <tr>
          <th scope="row">Размер</th>
          <td><input class="form-control" v-model="product.size"></td>
        </tr>
        <tr>
          <th scope="row">Принадлежность к полу</th>
          <td class="pruduct__td pruduct__td--sex">
            <label>
              <input 
                name="product-sex" 
                id="product-sex-male" 
                class="form-check-input" 
                type="radio"
                value="male"
                v-model="product.sex"
              >Мужской
            </label>
            <label>
              <input 
                name="product-sex" 
                id="product-sex-female" 
                class="form-check-input" 
                type="radio"
                value="female"
                v-model="product.sex"
              >Женский
            </label>
            <label>
              <input
                name="product-sex" 
                id="product-sex-unisex" 
                class="form-check-input" 
                type="radio"
                value="unisex"
                v-model="product.sex"
              >Универсальный
            </label>
          </td>
        </tr>
        <tr>
          <th scope="row">Статус</th>
          <td class="pruduct__td pruduct__td--status">
            <label>
              <input type="radio" name="product-status" value="active" v-model="product.status">
              Используется
            </label>
            <label>
              <input type="radio" name="product-status" value="off" v-model="product.status">
              Не используется
            </label>
          </td>
        </tr>
      </tbody>
    </table>
    <b-row>
      <b-col class="btn-group">
        <b-button class="btn" variant="outline-success" @click="save()">Сохранить</b-button>
        <b-button class="btn" variant="outline-danger">Удалить</b-button>
      </b-col>
    </b-row>
  </b-card>  
</template>

<script>
import copy from '@/functions/copy';
import uploads from '@/functions/userUploads';
import getExtention from '@/functions/getExtention';
import Icons from './icons';
import Palette from './palette';
import CategoriesToSelect from './categoriesToSelect';
import Photo from './photo';


export default {
  name: 'Details',
  components: {
    Icons,
    Palette,
    CategoriesToSelect,
    Photo,
  },
  props: {
    _product: {
      type: Object,
      default: {}
    },
  },
  data() {
    return {
      product: copy(this._product),
      showCategoriesList: false,
      refreshPhoto: false,
      uploadStatus: '',
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    save() {
      this.$store.dispatch('updateProduct', this.product);
      this.close();
    },
    setIcon(iconId) {
      this.product.icon_id = iconId;
    },
    setColor(color) {
      this.product.color = color;
    },
    setCategory(categoryId) {
      this.product.category = categoryId;
      this.showCategoriesList = false;
    },
    async addImage(e) {
      const file = e.target.files[0];
      const time = Math.floor(Date.now() / 1000);
      const ext = getExtention(file.type);
      const name = `${ this.$store.getters.activeRentalPoint }_${ this.product.id_rent }_${ time }${ ext }`;

      const formData = new FormData();

      formData.set('file', file, name);
      this.uploadStatus = 'Загрузка ...';
      
      const result = await uploads(formData);

      if (result) {
        this.uploadStatus = 'Загрузка завершена';
        this.product.img = `${ time }${ ext }`;
      } 

      this.refresh = true;    
    },
  },
  computed: {
    category() {
      if (!this.product || !this.product.category) {
        return false;
      }

      const category = this.$store.getters.categories.find(i => i.id_rent === this.product.category);
      return category;
    },
    parentCategories() {
      const categories = this.$store.getters.categories;

      const activeRentalPointId = this.$store.getters.activeRentalPointId;
      const categoriesOfActiveRentalPoint = categories.filter(i => i.id_rental_org === activeRentalPointId);

      return categoriesOfActiveRentalPoint;
    }
  }
}
</script>
<style lang="scss" scoped>
  .btn-group {
    margin-top: 50px;

    .btn {
      margin: 0 10px;
    }
  }
  .pruduct__td {
    &--sex {
      display: flex;
      justify-content: space-around;      
    }
    &--status {
      display: flex;
      justify-content: space-around;
    }
  }

  .product__photo--label {
    display: flex;
    flex-direction: row;
  }
  .details__photo {
    position: relative;
    width: 120px;
    height: 90px;
  }
  .details__photo:hover {
    cursor: pointer;
  }
  .photo__input {
    display: none;
  }
</style>
