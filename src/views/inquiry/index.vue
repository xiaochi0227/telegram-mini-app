<template>
  <div class="flex flex-col h-full">
    <div
      class="nav-header mx-[32px] px-[20px] mb-[24px] bg-[#fff] rounded-b-[12px]"
    >
      <nav-bar :hide-icon="true" />
    </div>

    <div class="flex-1 px-[32px] overflow-y-auto">
      <!-- 商品列表 -->
      <div
        v-for="(product, index) in form.products"
        :key="index"
        class="mb-[24px] px-[10px] py-[32px] rounded-[12px] bg-white shadow-sm relative"
      >
        <van-icon
          name="cross"
          color="#666666"
          class="!absolute right-[20px] top-[20px]"
          v-if="form.products.length > 1"
          @click="removeProduct(index)"
        />

        <div class="px-[20px] mb-[40px]">
          <p class="text-[28px] font-[600] mb-1">{{ t('inquiry.picture') }}</p>
          <!-- 商品图片上传 -->
          <!-- 上传按钮 -->
          <van-uploader
            accept="image"
            multiple
            :disabled="product.uploading || product.fileList.length >= maxCount"
            :max-count="maxCount"
            :before-read="(file) => beforeUpload(file, index)"
            :after-read="(file) => handleUpload(file, index)"
            :max-size="maxSize * 1024 * 1024"
            @oversize="onOversize"
            class="w-full"
          >
            <div
              class="flex flex-col justify-center items-center w-full h-[180px] rounded-[12px] bg-[#F9F9F9] border border-dashed border-[#EBEBEB] border-[4px]"
            >
              <van-loading size="24px" v-if="product.uploading" />
              <template v-else>
                <i class="iconfont icon-Picture"></i>
                <p class="text-[28px] text-[#C7C7C7] font-[500]">
                  {{ t('inquiry.uploadPicture') }}
                </p>
              </template>
            </div>
          </van-uploader>

          <!-- 上传信息 -->
          <van-cell
            :title="`${t('inquiry.alreadyUpload')}${product.fileList.length}/${maxCount}`"
            is-link
            class="view-file"
            @click="handleGoodsPicture(product.fileList, index)"
            v-if="product.fileList.length"
          />
        </div>

        <!-- 商品表单 -->
        <van-form :ref="(el) => setFormRef(el, index)">
          <!-- 商品参考链接 -->
          <van-field
            v-model="product.reference_url"
            :name="`products[${index}].reference_url`"
            :label="t('inquiry.productLink')"
            :placeholder="t('inquiry.productLinkPlaceholder')"
            :rules="[
              {
                validator: validateUrl,
                message: t('inquiry.productLinkInvalid'),
              },
            ]"
            class="mb-4 no-required"
          />

          <!-- 商品名称 -->
          <van-field
            v-model="product.product_name"
            maxlength="100"
            :name="`products[${index}].product_name`"
            :label="t('inquiry.productName')"
            :placeholder="t('inquiry.productNamePlaceholder')"
            :rules="[
              { required: true, message: t('inquiry.productNamePlaceholder') },
              { 
                validator: (val) => val.length >= 2 && val.length <= 100,
                message: t('inquiry.nameLimit')
              },
            ]"
            class="mb-4"
          />

          <!-- 商品数量 -->
          <van-field
            v-model="product.product_num"
            :name="`products[${index}].product_num`"
            type="digit"
            :label="t('inquiry.quantity')"
            :placeholder="t('inquiry.quantityPlaceholder')"
            :rules="[
              { required: true, message: t('inquiry.quantityPlaceholder') },
              {
                validator: validateQuantity,
                message: t('inquiry.quantityInvalid'),
              },
            ]"
            class="mb-4"
          />

          <!-- 商品说明 -->
          <van-field
            v-model="product.desc"
            :name="`products[${index}].desc`"
            :label="t('inquiriesDetails.goodsDesc')"
            type="textarea"
            :placeholder="t('inquiry.descPlaceholder')"
            rows="7"
            autosize
            class="mb-4 no-required"
          />
        </van-form>
      </div>

      <!-- 添加商品按钮 -->
      <van-button
        block
        plain
        round
        color="#FF356D"
        size="small"
        type="primary"
        icon="plus"
        @click="addProduct"
        class="!border-dashed"
      >
        {{ t('inquiry.addProduct') }}
      </van-button>

      <!-- 联系信息 -->
      <div
        class="my-[24px] px-[10px] py-[32px] rounded-[12px] bg-white shadow-sm"
      >
        <van-form ref="contactFormRef">
          <!-- 电子邮箱 -->
          <van-field
            v-model="form.contact.email"
            name="contact.email"
            :label="t('inquiry.email')"
            :placeholder="t('inquiry.emailPlaceholder')"
            :rules="[
              { required: true, message: t('inquiry.emailPlaceholder') },
              {
                pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                message: t('login.registerEmailInvalid'),
              },
            ]"
            class="mb-4"
          />

          <phone-input
            v-model="form.contact.phone_num"
            :required="false"
            :label="t('inquiry.phone')"
          />

          <!-- 商品说明 -->
          <van-field
            v-model="form.contact.memo"
            name="memo"
            :label="t('inquiry.remarks')"
            type="textarea"
            :placeholder="t('inquiry.remarksMaxlength')"
            maxlength="1000"
            rows="7"
            autosize
            class="mb-4 no-required"
          />
        </van-form>
      </div>
    </div>

    <div class="px-[32px] pb-[20px]">
      <!-- 提交按钮 -->
      <van-button
        round
        block
        color="#FF356D"
        size="large"
        type="primary"
        @click="handleSubmit"
        :loading="submitting"
      >
        {{ t('inquiry.submit') }}
      </van-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import NavBar from '@/components/nav-bar/index.vue'
import PhoneInput from '@/components/phone-input/index.vue'
import { ref, onActivated } from 'vue'
import { FormInstance, Toast, Notify } from 'vant'
import type { UploaderFileListItem } from 'vant/es/uploader/types'
import { useI18n } from 'vue-i18n'
import { inquiryApi } from '@/api'
import { useInquiryStore } from '@/store/inquiry'
import { useRouter } from 'vue-router'
import { useUser } from '@/hooks/user'

interface Product {
  uploading: boolean
  fileList: UploaderFileListItem[]
  reference_url: string
  product_name: string
  product_num: string
  desc: string
}

interface ContactInfo {
  email: string
  phone_num: string
  memo: string
}

interface FormData {
  products: Product[]
  contact: ContactInfo
}

const router = useRouter()
const { t } = useI18n()
const inquiryStore = useInquiryStore()

const productFormRefs = ref<FormInstance[]>([])
const contactFormRef = ref<FormInstance>()
const submitting = ref(false)

const form = ref<FormData>({
  products: [
    {
      uploading: false,
      fileList: [],
      reference_url: '',
      product_name: '',
      product_num: '',
      desc: '',
    },
  ],
  contact: {
    email: '',
    phone_num: '',
    memo: '',
  },
})

// 设置表单引用
const setFormRef = (el: FormInstance, index: number) => {
  if (el) {
    productFormRefs.value[index] = el
  }
}

// 添加商品
const addProduct = () => {
  form.value.products.push({
    uploading: false,
    fileList: [],
    reference_url: '',
    product_name: '',
    product_num: '',
    desc: '',
  })
}

// 删除商品
const removeProduct = (index: number) => {
  form.value.products.splice(index, 1)
  productFormRefs.value.splice(index, 1)
}

// 验证函数
const validateUrl = (val: string) => {
  if (!val) return true // 非必填
  try {
    new URL(val)
    return true
  } catch {
    return false
  }
}

const validateQuantity = (val: string) => {
  return Number(val) > 0
}

const maxCount = ref(5)
const maxSize = ref(10)
// 当前点击的是那一条
const edit_index = ref(-1)

const onOversize = () => {
  Toast(t('imageUpload.maxSize', { size: 10 }))
}

const beforeUpload = (file: File | File[], index: number) => {
  const files = Array.isArray(file) ? file : [file]

  if (
    form.value.products[index].fileList.length + files.length >
    maxCount.value
  ) {
    Toast(t('imageUpload.maxCount', { count: maxCount.value }))
    return false
  }

  const invalidFiles = files.filter((file) => {
    const isImage = file.type.startsWith('image/')
    if (!isImage) {
      Toast(t('imageUpload.imageOnly'))
      return true
    }

    const isLtSize = file.size / 1024 / 1024 < maxSize.value
    if (!isLtSize) {
      Toast(t('imageUpload.maxSize', { size: maxSize.value }))
      return true
    }

    return false
  })

  return invalidFiles.length === 0
}

const handleUpload = async (
  file: UploaderFileListItem | UploaderFileListItem[],
  index: number
) => {
  const files = Array.isArray(file) ? file : [file]
  form.value.products[index].uploading = true

  for (const item of files) {
    const formData = new FormData()
    if (item.file) {
      formData.append('file', item.file)
    }

    try {
      const response = (await inquiryApi.uploadImage(
        formData
      )) as UploadResponse

      if (response.code === 1) {
        const newFile: UploaderFileListItem = {
          uid: item.file?.name || Date.now().toString(),
          name: item.file?.name || 'image',
          status: 'done',
          url: response.data,
        }

        form.value.products[index].fileList = [
          ...form.value.products[index].fileList,
          newFile,
        ]
      } else {
        Toast(response.msg)
      }
    } catch (error) {
      console.error('Upload error:', error)
      Toast(t('imageUpload.uploadFailed'))
    }
  }

  form.value.products[index].uploading = false
}

// 处理图片
const handleGoodsPicture = (fileList: UploaderFileListItem[], index) => {
  edit_index.value = index
  inquiryStore.setGoodsPicture(fileList)
  router.push('/goods-picture')
}

// 验证所有商品表单
const validateAllProducts = async (): Promise<boolean> => {
  const promises: Promise<unknown>[] = []
  
  // 添加联系表单验证
  if (contactFormRef.value?.validate) {
    promises.push(contactFormRef.value.validate())
  }
  
  // 添加商品表单验证
  productFormRefs.value.forEach((form) => {
    if (form?.validate) {
      promises.push(form.validate())
    }
  })

  try {
    const results = await Promise.all(promises)
    return results.every((result) => result === undefined)
  } catch (error) {
    console.error('Validation error:', error)
    return false
  }
}

// 重置基础数据
const resetForm = () => {
  edit_index.value = -1
  inquiryStore.setGoodsPicture([])
  form.value = {
    products: [
      {
        uploading: false,
        fileList: [],
        reference_url: '',
        product_name: '',
        product_num: '',
        desc: '',
      },
    ],
    contact: {
      email: '',
      phone_num: '',
      memo: '',
    },
  }
}

// 表单提交
const handleSubmit = async () => {
  try {
    const { user } = useUser()
    // 检查用户是否登录
    if (!user.value) {
      Notify({ type: 'danger', message: t('inquiry.loginRequired') })
      router.push('/login')
      return
    }

    // 验证所有商品表单
    const productsValid = await validateAllProducts()

    if (!productsValid) {
      Notify({ type: 'danger', message: t('inquiry.infoRequired') })
      return
    }

    submitting.value = true

    const res = await inquiryApi.addInquirySheet({
      product_data: form.value.products.map((item: any) => {
        const { product_name, product_num, desc, reference_url, fileList } =
          item

        return {
          product_name,
          product_num,
          desc,
          reference_url,
          images: (fileList || []).map((item) => item.url),
        }
      }),
      country_code: '7',
      ...form.value.contact,
    })

    if (res.code != 1) return

    resetForm()
    router.push('/inquiry-success')
  } catch (error) {
  } finally {
    submitting.value = false
  }
}

// 监听页面激活
onActivated(() => {
  if (edit_index.value !== -1 && inquiryStore.goodsPicture.length > 0) {
    form.value.products[edit_index.value].fileList = inquiryStore.goodsPicture
  }
})
</script>

<style scoped lang="scss">
.van-uploader {
  :deep(.van-uploader__wrapper),
  :deep(.van-uploader__input-wrapper) {
    width: 100%;

    .icon-Picture {
      font-size: 50px;
      color: #c7c7c7;
    }
  }
}

.view-file {
  margin-top: 20px;
  padding: 20px 28px;
  border-radius: 12px;
  font-weight: 500;
  font-size: 28px;
  color: #ff356d;
  border: 1px solid #ff356d;

  :deep(.van-icon) {
    color: #ff356d;
  }
}

.van-field {
  position: relative;
  display: flex;
  flex-direction: column;
  background: transparent;

  &:after {
    display: none;
  }

  :deep(.van-cell__title) {
    width: 100%;
    font-size: 28px;
    color: #212121;
    font-weight: 500;

    &::before {
      content: '*';
      color: #ff356d;
      margin-right: 4px;
    }
  }

  &.no-required :deep(.van-cell__title::before) {
    display: none !important;
  }

  :deep(.van-field__body) {
    margin: 16px 0;
    padding: 0 20px;
    background: #f9f9f9;
    border-radius: 20px;
    border: 2px solid #ebebeb;

    input {
      height: 88px;
    }

    textarea {
      padding-top: 20px;
    }
  }

  :deep(.van-icon-arrow) {
    position: absolute;
    right: 30px;
    top: 86px;
    font-size: 30px;
  }

  &.disabled :deep(.van-field__body) {
    background: #f4f4f4;
  }
}
</style>
